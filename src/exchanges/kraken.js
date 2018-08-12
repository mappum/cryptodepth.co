'use strict'

module.exports = {
  getUrl (symbol) {
    return `https://api.kraken.com/0/public/Depth?pair=${symbol}&count=10000`
  },

  pairToSymbol ([ a, b ]) {
    return `X${a}X${b}`
  },

  aliases: {
    'BTC': 'XBT'
  }
}
