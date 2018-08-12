'use strict'

module.exports = {
  getUrl (symbol) {
    return `https://www.okex.com/api/v1/depth.do?symbol=${symbol}&size=200`
  }
}
