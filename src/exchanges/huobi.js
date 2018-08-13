'use strict'

const { numToString } = require('../util.js')

module.exports = {
  getUrl (symbol) {
    return `https://api.huobi.pro/market/depth?symbol=${symbol}&type=step0`
  },

  pairToSymbol (pair) {
    return pair.join('').toLowerCase()
  },

  normalizeData (data) {
    let { bids, asks } = data.tick
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
