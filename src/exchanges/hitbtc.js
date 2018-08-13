'use strict'

module.exports = {
  getUrl (symbol) {
    return `https://api.hitbtc.com/api/2/public/orderbook/${symbol}?limit=0`
  },

  pairToSymbol (pair) {
    return pair.join('')
  },

  normalizeData ({ ask, bid }) {
    let normalize = (array) =>
      array.map(({ price, size }) => [ price, size ])
    return {
      asks: normalize(ask),
      bids: normalize(bid)
    }
  },

  aliases: {
    'USDT': 'USD'
  }
}
