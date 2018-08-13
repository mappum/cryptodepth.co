'use strict'

const { numToString } = require('../util.js')

module.exports = {
  getUrl (symbol) {
    return `https://www.okex.com/api/v1/depth.do?symbol=${symbol}&size=200`
  },

  pairToSymbol (pair) {
    return pair.join('_').toLowerCase()
  },

  normalizeData ({ bids, asks }) {
    let normalize = (array) =>
      array.map(([ p, q ]) => [
        numToString(p),
        numToString(q)
      ])
    return {
      bids: normalize(bids),
      asks: normalize(asks).reverse()
    }
  }
}
