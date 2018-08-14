'use strict'

const { SECRET, FETCHER_URL } = process.env

const { get } = require('axios')
const fetchDepth = require('./src/fetchDepth.js')
const calculateStats = require('./src/calculateStats.js')
const fetchPair = require('./src/fetchPair.js')
const aggregate = require('./src/aggregate.js')
const exchanges = require('./src/exchanges')

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
  res.status(200).json(depth)
}

exports.aggregator = async (req, res) => {
  if (req.query.secret !== SECRET) {
    return res.status(401).send('gtfo')
  }

  if (!req.query.pair) {
    return res.status(400).send('missing args')
  }

  let pair = req.query.pair
    .toUpperCase().split('.')

  let results = await fetchPair(pair, gcfFetch)
  let aggregated = aggregate(results)
  res.json(calculateStats(aggregated))
}

async function gcfFetch (exchange, pair) {
  let url = `${FETCHER_URL}?secret=${SECRET}&pair=${pair}&exchange=${exchange}`
  let { data } = await get(url)
  return { exchange, data }
}
