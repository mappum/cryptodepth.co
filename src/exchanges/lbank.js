'use strict'

const { numToString } = require('../util.js')

module.exports = {
  getUrl (symbol) {
    return `https://api.lbank.info/v1/depth.do?symbol=${symbol}&size=60&merge=1`
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
      asks: normalize(asks)
    }
  }
}
