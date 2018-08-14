'use strict'

const bn = require('bignum')
const { PRECISION } = require('./util.js')

function calculateStats ({ bids, asks }) {
  let bidValue = bn(0)
  let bidQuantity = bn(0)
  let askValue = bn(0)
  let askQuantity = bn(0)

  let bestBid = bids[0][0]
  let bestAsk = asks[0][0]
  let indexPrice = bestBid.add(bestAsk).div(2)

  // let depth = {
  //   bids: [],
  //   asks: []
  // }

  for (let [ price, quantity ] of bids) {
    bidValue = bidValue.add(price.mul(quantity))
    bidQuantity = bidQuantity.add(quantity)
  }

  for (let [ price, quantity ] of asks) {
    if (price.gt(indexPrice.mul(2))) break
    askValue = askValue.add(price.mul(quantity))
    askQuantity = askQuantity.add(quantity)
  }

  bidValue = bidValue.div(bn(10 ** PRECISION))
  askValue = askValue.div(bn(10 ** PRECISION))

  return {
    bidValue,
    bidQuantity,
    askValue,
    askQuantity,
    bestBid,
    bestAsk
  }
}

module.exports = calculateStats
