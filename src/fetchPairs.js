'use strict'

const { JSDOM } = require('jsdom')
const { get } = require('axios')

// scrapes the list of pairs for the given exchange from coinmarketcap,
// resolves to an array of [ 'A', 'B' ] pairs lexicographically sorted
async function fetchPairs (exchangeName) {
  let res = await get(`https://coinmarketcap.com/exchanges/${exchangeName}/`)
  let { document } = (new JSDOM(res.data)).window
  let rows = [ ...document.querySelectorAll('tr') ]
  return rows
    .slice(1)
    .filter((tr) => {
      let updatedCell = tr.querySelector('td:last-child')
      return updatedCell.textContent === 'Recently'
    })
    .map((tr) => {
      let pairCell = tr.querySelector('td:nth-child(3)')
      return pairCell.textContent
    })
    .sort()
    .map((pair) => pair.split('/'))
}

module.exports = fetchPairs
