'use strict'

const { SECRET } = process.env

const exchanges = require('./src/exchanges')
const pairs = {}
for (let exchangeName in exchanges) {
  pairs[exchangeName] = require(`./pairs/${exchangeName}.json`)
}

exports.fetcher = async (req, res) => {
  if (req.query.secret !== SECRET) {
    return res.status(401).send('gtfo')
  }

  res.json(pairs[req.query.exchange])
}
