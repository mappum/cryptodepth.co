'use strict'

const { get } = require('axios')

async function fetchDepth (exchange, pair) {
  if (exchange.aliases != null) {
    pair = pair.map((s) => exchange.aliases[s] || s)
  }
  let symbol = exchange.pairToSymbol(pair)
  let url = exchange.getUrl(symbol)
  let { data } = await get(url)
  return exchange.normalizeData(data)
}

module.exports = fetchDepth
