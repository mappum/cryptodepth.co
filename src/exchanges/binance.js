'use strict'

module.exports = {
  getUrl (symbol) {
    return `https://api.binance.com/api/v1/depth?symbol=${symbol}&limit=1000`
  },

  pairToSymbol (pair) {
    return pair.join('')
  },

  aliases: {
    'MIOTA': 'IOT'
  }
}
