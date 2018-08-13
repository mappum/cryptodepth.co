'use strict'

// TODO: handle depth aggregation levels,
// some are too low precision, some are truncated

const { numToString } = require('../util.js')

module.exports = {
  getUrl (symbol) {
    return `https://api.bitfinex.com/v2/book/${symbol}/P3?len=100`
  },

  pairToSymbol (pair) {
    return 't' + pair.join('')
  },

  normalizeData (data) {
    let bids = []
    let asks = []
    for (let d of data) {
      let array = d[2] > 0 ? bids : asks
      array.push([
        numToString(d[0]),
        numToString(Math.abs(d[2]))
      ])
    }
    return { bids, asks }
  },

  aliases: {
    'QTUM': 'QTM',
    'MIOTA': 'IOT',
    'DASH': 'DSH'
  }
}
