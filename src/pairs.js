#!/usr/bin/env node
'use strict'

const exchanges = require('./exchanges')

const pairs = {}
const assets = {}
for (let exchangeName in exchanges) {
  let exchangePairs = require(`../pairs/${exchangeName}.json`)
  for (let pair of exchangePairs) {
    let symbol = pair.join('/')
    pairs[symbol] = pairs[symbol] || []
    pairs[symbol].push(exchangeName)
    assets[pair[0]] = assets[pair[0]] || []
    if (!assets[pair[0]].includes(symbol)) {
      assets[pair[0]].push(symbol)
    }
    assets[pair[1]] = assets[pair[1]] || []
    if (!assets[pair[1]].includes(symbol)) {
      assets[pair[1]].push(symbol)
    }
  }
}

const topAssets = Object.entries(assets)
  .sort((a, b) => b[1].length - a[1].length)

module.exports = { pairs, assets, topAssets }
