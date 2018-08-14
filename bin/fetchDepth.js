#!/usr/bin/env node
'use strict'

const exchanges = require('../src/exchanges')
const fetchDepth = require('../src/fetchDepth.js')
const calculateStats = require('../src/calculateStats.js')

async function main (pair, exchangeName, ...args) {
  pair = pair.toUpperCase().split('/')
  let exchange = exchanges[exchangeName]

  let depth = await fetchDepth(exchange, pair)
  if (args.includes('--raw')) {
    console.log(depth)
    return
  }

  let stats = calculateStats(depth)
  console.log(stats)
}

main(...process.argv.slice(2))
  .catch(function (err) { throw err })
