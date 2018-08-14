'use strict'

const bn = require('bignum')
const {
  parseValue,
  stringifyValue,
  PRECISION
} = require('./util.js')

function calculateStats ({ bids, asks }) {
  let bidValue = bn(0)
  let bidQuantity = bn(0)
  let askValue = bn(0)
  let askQuantity = bn(0)

  for (let [ price, quantity ] of bids) {
    price = parseValue(price)
    quantity = parseValue(quantity)
    bidValue = bidValue.add(price.mul(quantity))
    bidQuantity = bidQuantity.add(quantity)
  }

  let bestBidX2 = parseValue(bids[0][0]).mul(2)
  for (let [ price, quantity ] of asks) {
    price = parseValue(price)
    if (price.gt(bestBidX2)) break

    quantity = parseValue(quantity)
    askValue = askValue.add(price.mul(quantity))
    askQuantity = askQuantity.add(quantity)
  }

  bidValue = bidValue.div(bn(10 ** PRECISION))
  askValue = askValue.div(bn(10 ** PRECISION))

  return {
    bidValue: stringifyValue(bidValue),
    bidQuantity: stringifyValue(bidQuantity),
    askValue: stringifyValue(askValue),
    askQuantity: stringifyValue(askQuantity)
  }
}

module.exports = calculateStats
