#!/usr/bin/env node
'use strict'

const fetchPair = require('../src/fetchPair.js')
const aggregate = require('../src/aggregate.js')

async function main (pair) {
  pair = pair.toUpperCase().split('/')

  let results = await fetchPair(pair)
  let aggregated = aggregate(results)
  console.log(aggregated)
}

main(...process.argv.slice(2))
  .catch(function (err) { throw err })
