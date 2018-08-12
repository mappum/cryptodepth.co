'use strict'

const { readdirSync } = require('fs')
const { join } = require('path')

// loads all modules in this directory,
// uses filenames (minus extension) as the keys
let modules = {}
readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    let name = file.split('.')[0]
    let path = join(__dirname, file)
    modules[name] = require(path)
  })

module.exports = modules
