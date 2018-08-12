'use strict'

module.exports = {
  getUrl (symbol) {
    return `http://api.zb.cn/data/v1/depth?market=${symbol}&size=100`
  },

  pairToSymbol (pair) {
    return pair.join('')
  }
}
