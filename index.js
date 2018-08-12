'use strict'

const { get } = require('axios')
const bignum = require('bignum')

async function main () {
  let { data } = await get(getBinanceUrl('ZECBTC'))
  let { bids } = data

  let sum = bignum(0)
  let lastPrice

  for (let [ price, quantity ] of bids) {
    price = parseValue(price)
    quantity = parseValue(quantity)
    sum = sum.add(price.mul(quantity))
    lastPrice = price
    console.log(price, quantity, sum)
  }

  sum = sum.div(bignum(1e8))

  console.log(`bid depth: ${formatValue(sum)} BTC, ${formatValue(lastPrice)} BTC`)
}

main()

function getBinanceUrl (symbol, limit = 1000) {
  if (!symbol) {
    throw Error('symbol argument is required')
  }
  return `https://api.binance.com/api/v1/depth?symbol=${symbol}&limit=${limit}`
}

function parseValue (str) {
  return bignum(str.replace('.', ''))
}

function formatValue (n) {
  let str = n.toString()
  let fraction = str.slice(-8).padStart(8, '0')
  let whole = str.slice(0, -8) || '0'
  return `${whole}.${fraction}`
}
