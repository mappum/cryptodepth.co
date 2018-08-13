'use strict'

module.exports = {
  getUrl (symbol) {
    return `https://api.pro.coinbase.com/products/${symbol}/book?level=3`
  },

  pairToSymbol (pair) {
    return pair.join('-')
  },

  normalizeData ({ bids, asks }) {
    let normalize = (array) =>
      array.map(([ p, q ]) => [ p, q ])
    return {
      bids: normalize(bids),
      asks: normalize(asks)
    }
  }
}
