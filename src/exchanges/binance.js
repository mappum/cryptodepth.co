'use strict'

module.exports = {
  getUrl (symbol) {
    return `https://api.binance.com/api/v1/depth?symbol=${symbol}&limit=1000`
  },

  pairToSymbol (pair) {
    return pair.join('')
  },

  normalizeData ({ bids, asks }) {
    let normalize = (array) =>
      array.map(([ p, q ]) => [ p, q ])
    return {
      bids: normalize(bids),
      asks: normalize(asks)
    }
  },

  aliases: {
    'MIOTA': 'IOT'
  }
}
