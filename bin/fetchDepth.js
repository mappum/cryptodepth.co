#!/usr/bin/env node
'use strict'

const exchanges = require('../src/exchanges')
const fetchDepth = require('../src/fetchDepth.js')

async function main (pair, exchangeName) {
  pair = pair.toUpperCase().split('/')
  let exchange = exchanges[exchangeName]

  let depth = await fetchDepth(exchange, pair)
  console.log(depth)
}

main(...process.argv.slice(2))
  .catch(function (err) { throw err })
