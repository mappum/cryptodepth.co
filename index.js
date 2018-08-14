'use strict'

const { SECRET } = process.env

const { get } = require('axios')
const fetchDepth = require('./src/fetchDepth.js')
const calculateStats = require('./src/calculateStats.js')
const aggregate = require('./src/aggregate.js')
const exchanges = require('./src/exchanges')

const pairExchanges = {}
for (let exchangeName in exchanges) {
  let pairs = require(`./pairs/${exchangeName}.json`)

  for (let pair of pairs) {
    let symbol = pair.join('/')
    if (!pairExchanges[symbol]) {
      pairExchanges[symbol] = []
    }
    pairExchanges[symbol].push(exchangeName)
  }
}

const FETCHER_URL = 'https://us-central1-cryptodepth.cloudfunctions.net/fetcher'

exports.fetcher = async (req, res) => {
  if (req.query.secret !== SECRET) {
    return res.status(401).send('gtfo')
  }

  if (!req.query.exchange || !req.query.pair) {
    return res.status(400).send('missing args')
  }

  let exchange = exchanges[req.query.exchange]
  if (!exchange) {
    return res.status(400).send('invalid exchange')
  }

  let pair = req.query.pair
    .toUpperCase().split('/')

  let depth = await fetchDepth(exchange, pair)
  let stats = calculateStats(depth)
  res.status(200).json(stats)
}

exports.aggregator = async (req, res) => {
  if (req.query.secret !== SECRET) {
    return res.status(401).send('gtfo')
  }

  if (!req.query.pair) {
    return res.status(400).send('missing args')
  }

  let pair = req.query.pair.toUpperCase()
  let exchanges = pairExchanges[pair]
  if (!exchanges) {
    return res.status(400).send('invalid pair')
  }

  let fetchers = exchanges.map(async (exchangeName) => {
    let url = `${FETCHER_URL}?secret=${SECRET}&pair=${pair}&exchange=${exchangeName}`
    let { data } = await get(url)
    return { exchange: exchangeName, data }
  })

  let results = await Promise.all(fetchers)

  let formatted = {}
  for (let { exchange, data } of results) {
    formatted[exchange] = data
  }

  let result = aggregate(formatted)

  res.json({
    result,
    exchanges: formatted
  })
}
