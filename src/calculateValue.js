'use strict'

const bn = require('bignum')
const { parseResults } = require('./aggregate.js')
const { assets } = require('./pairs.js')
const debug = require('debug')('calculateValue')

// TODO: fetch rates dynamically
const TO_USD = {
  'EUR': bn(1.13e8),
  'JPY': bn(0.009e8),
  'CNY': bn(0.14e8),
  'USDT': bn(1e8),
  'USD': bn(1e8)
}

function calculateValue (asset, depth) {
  let value = bn(0)
  for (let otherAsset in TO_USD) {
    // TODO: handle the asset being the quote currency (second in pair)
    let pair = [ asset, otherAsset ]
    let pairStr = pair.join('/')
    if (depth[pairStr] == null) continue

    let usdRate = TO_USD[otherAsset]
    let { bids } = depth[pairStr]

    for (let [ price, quantity ] of bids) {
      let amount = price.mul(usdRate).mul(quantity)
      value = value.add(amount)
    }
  }

  // TODO: recurse into non-fiat

  return value.div(TO_USD.USD).div(TO_USD.USD)
}

function deepClone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

module.exports = calculateValue
