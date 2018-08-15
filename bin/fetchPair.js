#!/usr/bin/env node
'use strict'

const fetchPair = require('../src/fetchPair.js')
const aggregate = require('../src/aggregate.js')
const calculateStats = require('../src/calculateStats.js')

async function main (pair) {
  pair = pair.toUpperCase().split('/')

  try {
    let results = await fetchPair(pair)
    let aggregated = aggregate(results)
    let stats = calculateStats(aggregated)
    console.log(stats)
  } catch (err) {
    if (err.response && err.response.data) {
      console.log(err.response.config.url)
      console.log(err.response.data)
    }
    console.log(err.stack)
  }
}

main(...process.argv.slice(2))
  .catch(function (err) { throw err })
