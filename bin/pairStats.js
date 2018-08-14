#!/usr/bin/env node
'use strict'

const exchanges = require('../src/exchanges')

async function main (pair) {
  const pairs = {}
  const coins = {}
  for (let exchangeName in exchanges) {
    let exchangePairs = require(`../pairs/${exchangeName}.json`)
    for (let pair of exchangePairs) {
      let symbol = pair.join('/')
      pairs[symbol] = true
      coins[pair[0]] = true
      coins[pair[1]] = true
    }
  }
  console.log(`coins: ${Object.keys(coins).length}, pairs: ${Object.keys(pairs).length}`)
}

main(...process.argv.slice(2))
  .catch(function (err) { throw err })
