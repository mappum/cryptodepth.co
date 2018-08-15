#!/usr/bin/env node
'use strict'

const exchanges = require('../src/exchanges')

async function main (pair) {
  const pairs = {}
  const assets = {}
  for (let exchangeName in exchanges) {
    let exchangePairs = require(`../pairs/${exchangeName}.json`)
    for (let pair of exchangePairs) {
      let symbol = pair.join('/')
      pairs[symbol] = (pairs[symbol] || []).push(exchangeName)
      assets[pair[0]] = (assets[pair[0]] || 0) + 1
      assets[pair[1]] = (assets[pair[1]] || 0) + 1
    }
  }

  console.log(`assets: ${Object.keys(assets).length}, pairs: ${Object.keys(pairs).length}`)

  let topAssets = Object.entries(assets)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
  console.log(`top assets (by pair/exchange count):`)
  for (let [ symbol, count ] of topAssets) {
    console.log(`  ${symbol}: ${count}`)
  }
}

main(...process.argv.slice(2))
  .catch(function (err) { throw err })
