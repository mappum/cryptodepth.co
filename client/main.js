'use strict'

const choo = require('choo')
const html = require('choo/html')

let app = choo()
app.use(store)
app.route('/', mainView)
app.mount('body')

function mainView (state, emit) {
  return html`
    <body>
      ${header()}
      <section class="main">
        ${table(state.data)}
      </section>
    </body>
  `
}

function header () {
  return html`
    <header>
      <div>
        <h1>cryptodepth</h1>
      </div>
    </header>
  `
}

function table (data) {
  return html`
    <table>
      <tr>
        <th>#</th>
        <th>Asset</th>
        <th>Effective Value</th>
        <th>Market Share</th>
        <th>Cost to 2X Price</th>
        <th>1% Dump Price</th>
        <th>
          <a class="suggest" href="https://github.com/mappum/cryptodepth.co/issues/new?labels=indicator%20suggestion">
            Suggest An<br>Indicator
          </a>
        </th>
      </tr>
      ${data.map(row)}
    </table>
  `
}

function row (data, i) {
  return html`
    <tr>
      <td>${i + 1}</td>
      <td><strong>${data.symbol}</strong></td>
      <td>${formatDollars(data.effectiveValue)}</td>
      <td>${formatPercent(data.marketShare)}</td>
      <td>${formatDollars(data.costTo2x)}</td>
      <td>${formatPercent(-data.dump1Percent)}</td>
      <td></td>
    </tr>
  `
}

function formatDollars (n) {
  return '$' + n.toLocaleString()
}

function formatPercent (n) {
  // TODO: change precision for small numbers
  return n.toFixed(1) + '%'
}

function store (state, emitter) {
  // TODO: fetch data from API
  state.data = [
    {
      symbol: 'BTC',
      effectiveValue: 1234567890,
      marketShare: 60.345,
      costTo2x: 1234567890,
      dump1Percent: 4.567
    }
  ]
  for (let i = 0; i < 5; i++) {
    state.data = state.data.concat(state.data)
  }
}
