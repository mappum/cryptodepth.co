'use strict'

const { parseValue } = require('./util.js')

// aggregates depth from multiple exchanges into a single order book
function aggregate (results) {
  results = parseResults(results)

  let bids = []
  let asks = []

  // iterate until all results are empty
  while (true) {
    let best = getBest(results)
    if (!best.bids && !best.asks) {
      // we consumed all the results
      break
    }
    if (best.bids) {
      push(bids, best.bids[0])
      best.bids.shift()
    }
    if (best.asks) {
      push(asks, best.asks[0])
      best.asks.shift()
    }
  }

  return { bids, asks }
}

function push (array, order) {
  if (array.length > 0) {
    let last = array[array.length - 1]
    if (order[0].eq(last[0])) {
      last[1] = last[1].add(order[1])
      return
    }
  }

  array.push(order)
}

function getBest (results) {
  let bids
  let asks
  for (let res of results) {
    if (res.bids.length > 0) {
      if (!bids || res.bids[0][0].gt(bids[0][0])) {
        bids = res.bids
      }
    }
    if (res.asks.length > 0) {
      if (!asks || res.asks[0][0].lt(asks[0][0])) {
        asks = res.asks
      }
    }
  }
  return { bids, asks }
}

function parseResults (results) {
  results = Object.values(results)
  for (let res of results) {
    for (let bid of res.bids) {
      bid[0] = parseValue(bid[0])
      bid[1] = parseValue(bid[1])
    }
    for (let ask of res.asks) {
      ask[0] = parseValue(ask[0])
      ask[1] = parseValue(ask[1])
    }
  }
  return results
}

module.exports = aggregate
module.exports.parseResults = parseResults
