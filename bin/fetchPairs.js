#!/usr/bin/env node
'use strict'

const { writeFileSync } = require('fs')
const { join } = require('path')
const exchanges = require('../src/exchanges')
const fetchPairs = require('../src/fetchPairs.js')

// fetches the pairs for each exchange and writes them out
// to "pairs/${exchangeName}.json"
async function main () {
  let pairsDir = join(__dirname, '../pairs')

  for (let exchangeName in exchanges) {
    let pairs = await fetchPairs(exchangeName)
    let fileName = `${exchangeName}.json`
    let path = join(pairsDir, fileName)
    let json = JSON.stringify(pairs, null, '  ')
    writeFileSync(path, json)
    console.log(`${pairs.length} pairs written to pairs/${fileName}`)
  }
}

main().catch(function (err) { throw err })
