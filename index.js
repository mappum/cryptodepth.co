'use strict'

const { SECRET } = process.env

const fetchPair = require('./src/fetchPair.js')
const aggregate = require('./src/aggregate.js')

exports.fetchPair = handleErrors(async (req, res) => {
  if (req.query.secret !== SECRET) {
    return res.status(401).send('gtfo')
  }

  if (!req.query.pair) {
    return res.status(400).send('missing args')
  }

  let pair = req.query.pair
    .toUpperCase().split('/')

  let results = await fetchPair(pair)
  let aggregated = aggregate(results)
  res.json(aggregated)
})

function handleErrors (func) {
  return async function (req, res) {
    try {
      await func(req, res)
    } catch (_err) {
      let err = {
        message: _err.message,
        stack: _err.stack.split('\n')
      }

      if (_err.response) {
        err.url = _err.response.config.url
        err.response = _err.response.data
      }

      res.status(500).json(err)
    }
  }
}
