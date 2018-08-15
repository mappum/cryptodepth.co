'use strict'

const {
  readFileSync,
  readFile,
  writeFile,
  stat
} = require('fs-extra')
const { get } = require('axios')
const bn = require('bignum')
const debug = require('debug')('cryptodepth')
const yaml = require('yaml').default
const exchanges = require('./exchanges')
const calculateValue = require('./calculateValue.js')
const { topAssets } = require('./pairs.js')
const { parseResults } = require('./aggregate.js')

const configData = readFileSync('./env.yaml', 'utf8')
const config = yaml.parse(configData)

async function fetchPair (pair) {
  // TODO: handle retries
  let symbol = pair.join('/')
  let url = `${config.FETCHER_URL}?secret=${config.SECRET}&pair=${symbol}`
  debug(`fetching ${symbol} depth...`)
  debug(url)
  try {
    let { data } = await get(url)
    debug(`got ${symbol} depth`)
    return data
  } catch (err) {
    console.log(err.response.data)
    throw err
  }
}

async function createDaemon () {
  let depth = {}
  let times = {}

  console.log('fetching missing pair data')
  for (let [ symbol, assetPairs ] of topAssets) {
    for (let pairStr of assetPairs) {
      let pair = pairStr.split('/')
      if (pair[0] !== symbol) continue

      try {
        let { time, data } = await load(pair)
        depth[pairStr] = data
        times[pairStr] = time
      } catch (err) {
        let data = await fetchPair(pair)
        depth[pairStr] = data
        times[pairStr] = Date.now()
        await save(pair, data)
      }
    }
  }

  console.log('parsing')
  parseResults(depth)

  console.log('calculating effective value')
  let values = []
  let totalValue = bn(0)
  for (let [ asset ] of topAssets) {
    let value = calculateValue(asset, depth)
    if (value.eq(bn(0))) continue
    values.push({ asset, value })
    totalValue = totalValue.add(value)
  }

  for (let value of values) {
    value.dominance = value.value
      .mul(1e8)
      .mul(100)
      .div(totalValue)
  }

  values.sort((a, b) => b.value.cmp(a.value))
  return { values, totalValue }
}

function pairFilename (pair) {
  return `./data/${pair.join('_')}.json`
}

async function save (pair, data) {
  let filename = pairFilename(pair)
  debug(`saving ${pair.join('/')} depth to "${filename}"`)
  let json = JSON.stringify(data)
  await writeFile(filename, json)
  debug(`saved ${pair.join('/')} depth`)
}

async function load (pair) {
  let filename = pairFilename(pair)
  let stats = await stat(filename)
  let json = await readFile(filename)
  let data = JSON.parse(json)
  return {
    time: stats.mtime.getTime(),
    data
  }
}

module.exports = createDaemon
