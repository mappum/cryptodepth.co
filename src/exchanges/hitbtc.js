'use strict'

const T_PAIRS = {
  'XRPUSD': true,
  'REPUSD': true,
  'BCPTUSD': true,
  'SBTCUSD': true,
  'DRTUSD': true,
  'AVHUSD': true,
  'CLOUTUSD': true,
  'EKOUSD': true,
  'FRECUSD': true,
  'XMCUSD': true,
  'EMCUSD': true
}

module.exports = {
  getUrl (symbol) {
    return `https://api.hitbtc.com/api/2/public/orderbook/${symbol}?limit=0`
  },

  pairToSymbol (pair) {
    let symbol = pair.join('')
    if (T_PAIRS[symbol]) symbol += 'T'
    if (symbol === 'USDUSD') return 'USDTUSD'
    return symbol
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
