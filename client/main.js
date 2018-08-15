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
      <thead>
        <tr>
          <th>#</th>
          <th>Asset</th>
          <th>
            Effective Value
            <div class="tooltip">
              <strong>Effective value</strong> is an alternative to market cap, which measures the total value of an asset.
              <br><br>
              It measures the amount of liquidity provided to sellers of the asset across all major exchanges.
              <br><br>
              It is equivalent to the amount of value we could get by dumping the asset to zero, based on the current order books.
            </div>
          </th>
          <th>
            Dominance
            <div class="tooltip">
              <strong>Dominance</strong> is the market share of the entire crypto market, based on effective value.
            </div>
          </th>
          <th>
            Cost to 2X Price
            <div class="tooltip">
              <strong>Cost to 2X price</strong> measures how much liquidity is being provided by sellers of the asset.
              <br><br>
              It is equivalent to the amount of buying that needs to happen to double the price on all major exchanges, based on the current order books.
            </div>
          </th>
          <th>
            Crashiness
            <div class="tooltip">
              <strong>Crashiness</strong> measures how much the price would change if 1% of the asset's existing tokens were dumped.
              <br><br>
              If the value is relatively high, it means the token supply is high relative to the effective supply flowing through the market (for example, large stashes held by the founders).
            </div>
          </th>
          <th>
            <a class="suggest" href="https://github.com/mappum/cryptodepth.co/issues/new?labels=indicator%20suggestion">
              Suggest An<br>Indicator
            </a>
          </th>
        </tr>
      </thead>
      <tbody>
        ${data.map(row)}
      </tbody>
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
