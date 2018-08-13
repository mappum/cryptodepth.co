'use strict'

const { numToString } = require('../util.js')

module.exports = {
  getUrl (symbol) {
    return `http://api.zb.cn/data/v1/depth?market=${symbol}&size=100`
  },

  pairToSymbol (pair) {
    return pair.join('')
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
