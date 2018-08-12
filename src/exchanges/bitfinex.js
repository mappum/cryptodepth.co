'use strict'

module.exports = {
  getUrl (symbol) {
    return `https://api.bitfinex.com/v2/book/${symbol}/P3?len=100`
  },

  pairToSymbol (pair) {
    return 't' + pair.join('')
  },

  aliases: {
    'QTUM': 'QTM',
    'MIOTA': 'IOT',
    'DASH': 'DSH'
  }
}
