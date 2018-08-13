'use strict'

const test = require('ava')
const { join } = require('path')
const exchanges = require('../src/exchanges')
const fetchDepth = require('../src/fetchDepth.js')

const MAX_FETCH_PAIRS = 5

for (let exchangeName in exchanges) {
  let exchange = exchanges[exchangeName]

  test(`pairToSymbol for ${exchangeName}`, (t) => {
    let symbol = exchange.pairToSymbol([ 'ABC', 'DEF' ])
    t.true(typeof symbol === 'string')
    t.true(symbol.toLowerCase().includes('abc'))
    t.true(symbol.toLowerCase().includes('def'))
  })

  test(`getUrl for ${exchangeName}`, (t) => {
    let url = exchange.getUrl('ABCDEF')
    t.true(typeof url === 'string')
    t.true(url.includes('ABCDEF'))
  })

  let pairsPath = join(__dirname, '../pairs', `${exchangeName}.json`)
  let pairs = require(pairsPath)
  while (pairs.length > MAX_FETCH_PAIRS) {
    let index = Math.floor(Math.random() * pairs.length)
    pairs.splice(index, 1)
  }

  for (let pair of pairs) {
    test(`fetching depth for ${exchangeName} ${pair.join('/')}`, async (t) => {
      try {
        let depth = await fetchDepth(exchange, [ 'LTC', 'BTC' ])
        t.true(Array.isArray(depth.bids))
        t.true(depth.asks.length > 10)
        t.true(Array.isArray(depth.asks))
        t.true(depth.bids.length > 10)
        t.is(typeof depth.bids[0][0], 'string')
        t.is(typeof depth.bids[0][1], 'string')
        t.is(typeof depth.asks[0][0], 'string')
        t.is(typeof depth.asks[0][1], 'string')
        t.true(depth.bids[0][0] > depth.bids[depth.bids.length - 1][0])
        t.true(depth.asks[0][0] < depth.asks[depth.asks.length - 1][0])
      } catch (err) {
        t.fail(JSON.stringify(err.response.data))
      }
    })
  }
}
