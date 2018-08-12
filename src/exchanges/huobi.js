'use strict'

module.exports = {
  getUrl (symbol) {
    return `https://api.huobi.pro/market/depth?symbol=${symbol}&type=step0`
  },

  pairToSymbol (pair) {
    return pair.join('').toLowerCase()
  }
}
