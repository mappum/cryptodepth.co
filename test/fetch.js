'use strict'

const test = require('ava')
const { get } = require('axios')
const { join } = require('path')
const exchanges = require('../src/exchanges')

const MAX_PAIRS = 10

for (let exchangeName in exchanges) {
  let exchange = exchanges[exchangeName]
  let pairsPath = join(__dirname, '../pairs', `${exchangeName}.json`)
  let pairs = require(pairsPath)

  while (pairs.length > MAX_PAIRS) {
    let index = Math.floor(Math.random() * pairs.length)
    pairs.splice(index, 1)
  }

  for (let pair of pairs) {
    test(`fetching depth for ${exchangeName} ${pair.join('/')}`, async (t) => {
      if (exchange.aliases != null) {
        pair = pair.map((s) => exchange.aliases[s] || s)
      }

      let symbol = exchange.pairToSymbol(pair)
      t.true(typeof symbol === 'string')
      t.true(symbol.length >= 2)

      let url = exchange.getUrl(symbol)
      t.true(typeof url === 'string')
      t.true(url.includes(symbol))

      let err
      for (let i = 0; i < 3; i++) {
        try {
          await get(url)
          t.pass()
          return
        } catch (_err) {
          err = _err
        }
        await sleep(1000)
      }
      t.fail(JSON.stringify(err.response.data))
    })
  }
}

function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
