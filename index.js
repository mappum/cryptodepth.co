'use strict'

const { SECRET } = process.env

const exchanges = require('./src/exchanges')
const fetchDepth = require('./src/fetchDepth.js')
const calculateStats = require('./src/calculateStats.js')

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
