'use strict'

const bn = require('bignum')
const {
  parseValue,
  stringifyValue,
  PRECISION
} = require('./util.js')

function calculateStats ({ bids, asks }) {
  let dumpValue = bn(0)
  let dumpCapacity = bn(0)

  for (let [ price, quantity ] of bids) {
    price = parseValue(price)
    quantity = parseValue(quantity)
    dumpValue = dumpValue.add(price.mul(quantity))
    dumpCapacity = dumpCapacity.add(quantity)
  }

  dumpValue = dumpValue.div(bn(10 ** PRECISION))

  return {
    dumpValue: stringifyValue(dumpValue),
    dumpCapacity: stringifyValue(dumpCapacity)
  }
}

module.exports = calculateStats
