'use strict'

const exchanges = require('./exchanges')
const fetchDepth = require('./fetchDepth.js')
const calculateStats = require('./calculateStats.js')

// index exchanges for each pair
const pairExchanges = {}
for (let exchangeName in exchanges) {
  let pairs = require(`../pairs/${exchangeName}.json`)

  for (let pair of pairs) {
    let symbol = pair.join('/')
    if (!pairExchanges[symbol]) {
      pairExchanges[symbol] = []
    }
    pairExchanges[symbol].push(exchangeName)
  }
}

async function fetchPair (pair, fetch = defaultFetch) {
  let symbol = pair.join('/').toUpperCase()
  let exchangeNames = pairExchanges[symbol]

  let fetches = exchangeNames.map((name) => fetch(name, pair))
  let results = await Promise.all(fetches)

  let formatted = {}
  for (let { exchange, data } of results) {
    formatted[exchange] = data
  }
  return formatted
}

async function defaultFetch (exchangeName, pair) {
  let exchange = exchanges[exchangeName]
  let depth = await fetchDepth(exchange, pair)
  let data = calculateStats(depth)
  return {
    exchange: exchangeName,
    data
  }
}

module.exports = fetchPair
