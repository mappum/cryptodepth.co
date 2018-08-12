'use strict'

module.exports = {
  getUrl (symbol) {
    return `https://api.lbank.info/v1/depth.do?symbol=${symbol}&size=60&merge=1`
  },

  pairToSymbol (pair) {
    return pair.join('_').toLowerCase()
  }
}
