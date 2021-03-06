'use strict'

module.exports = {
  getUrl (symbol) {
    return `https://api.kraken.com/0/public/Depth?pair=${symbol}&count=10000`
  },

  pairToSymbol (pair) {
    return pair.join('')
  },

  normalizeData (data) {
    let { bids, asks } = Object.values(data.result)[0]
    let normalize = (array) =>
      array.map(([ p, q ]) => [ p, q ])
    return {
      bids: normalize(bids),
      asks: normalize(asks)
    }
  },

  aliases: {
    'BTC': 'XBT',
    'DOGE': 'XDG',
    'STR': 'XLM'
  }
}
