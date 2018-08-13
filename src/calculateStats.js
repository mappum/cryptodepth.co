'use strict'

const bn = require('bignum')

const PRECISION = 8

function calculateStats ({ bids, asks }) {
  let dumpValue = bn(0)
  let dumpQuantity = bn(0)

  for (let [ price, quantity ] of bids) {
    price = parseValue(price)
    quantity = parseValue(quantity)
    dumpValue = dumpValue.add(price.mul(quantity))
    dumpQuantity = dumpQuantity.add(quantity)
  }

  dumpValue = dumpValue.div(bn(10 ** PRECISION))

  return {
    dumpValue: stringifyValue(dumpValue),
    dumpQuantity: stringifyValue(dumpQuantity)
  }
}

function parseValue (str) {
  let [ whole, fraction ] = str.split('.')
  fraction = fraction || '0'
  fraction = fraction.padStart(PRECISION, '0')
  let integer = whole + fraction
  return bn(integer)
}

function stringifyValue (n) {
  let str = n.toString()
  let whole = str.slice(0, -PRECISION)
  let fraction = str.slice(-PRECISION)
  return `${whole}.${fraction}`
}

module.exports = calculateStats
