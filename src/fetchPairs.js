'use strict'

const { JSDOM } = require('jsdom')
const { get } = require('axios')

// scrapes the list of pairs for the given exchange from coinmarketcap,
// resolves to an array of [ 'A', 'B' ] pairs lexicographically sorted
async function fetchPairs (exchangeName) {
  let res = await get(`https://coinmarketcap.com/exchanges/${exchangeName}/`)
  let { document } = (new JSDOM(res.data)).window
  let rows = [ ...document.querySelectorAll('tr') ]
  let pairs = rows.slice(1).map((tr) => {
    let td = tr.querySelector('td:nth-child(3)')
    return td.textContent
  })
  pairs.sort()
  return pairs.map((pair) => pair.split('/'))
}

module.exports = fetchPairs
