'use strict'

module.exports = {
  getUrl (symbol) {
    return `https://api.pro.coinbase.com/products/${symbol}/book?level=3`
  },

  pairToSymbol (pair) {
    return pair.join('_')
  }
}
