'use strict'

const pairs = require('./pairs/binance.json')

exports.fetcher = async (req, res) => {
  res.send(JSON.stringify(pairs))
}
