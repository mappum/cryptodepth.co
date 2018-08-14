'use strict'

const bn = require('bignum')
const {
  parseValue,
  stringifyValue,
  PRECISION
} = require('./util.js')

function aggregate (results) {
  let dumpValue = bn(0)
  let dumpCapacity = bn(0)

  for (let data of Object.values(results)) {
    dumpValue = dumpValue.add(
      parseValue(data.dumpValue)
    )
    dumpCapacity = dumpCapacity.add(
      parseValue(data.dumpCapacity)
    )
  }

  return {
    dumpValue: stringifyValue(dumpValue),
    dumpCapacity: stringifyValue(dumpCapacity)
  }
}

module.exports = aggregate
