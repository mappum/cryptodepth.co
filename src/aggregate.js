'use strict'

const bn = require('bignum')
const {
  parseValue,
  stringifyValue
} = require('./util.js')

function aggregate (results) {
  let bidValue = bn(0)
  let bidQuantity = bn(0)
  let askValue = bn(0)
  let askQuantity = bn(0)

  for (let data of Object.values(results)) {
    bidValue = bidValue.add(
      parseValue(data.bidValue)
    )
    bidQuantity = bidQuantity.add(
      parseValue(data.bidQuantity)
    )
    askValue = askValue.add(
      parseValue(data.askValue)
    )
    askQuantity = askQuantity.add(
      parseValue(data.askQuantity)
    )
  }

  return {
    bidValue: stringifyValue(bidValue),
    bidQuantity: stringifyValue(bidQuantity),
    askValue: stringifyValue(askValue),
    askQuantity: stringifyValue(askQuantity)
  }
}

module.exports = aggregate
