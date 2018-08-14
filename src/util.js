'use strict'

const bn = require('bignum')
const { inspect } = require('util')

const PRECISION = 8

bn.prototype.toJSON = stringifyThis
bn.prototype[inspect.custom] = stringifyThis

function stringifyThis () {
  return stringifyValue(this)
}

function numToString (n) {
  return n.toFixed(PRECISION)
}

function parseValue (str) {
  let [ whole, fraction ] = str.split('.')
  fraction = fraction || '0'
  fraction = fraction.padEnd(PRECISION, '0')
  let integer = whole + fraction
  return bn(integer)
}

function stringifyValue (n) {
  let str = n.toString()
  let whole = str.slice(0, -PRECISION) || '0'
  let fraction = str.slice(-PRECISION).padStart(PRECISION, '0')
  return `${whole}.${fraction}`
}

module.exports = {
  numToString,
  parseValue,
  stringifyValue,
  PRECISION
}
