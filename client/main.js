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
      <header>
        <div>
          <h1>cryptodepth</h1>
        </div>
      </header>
      <section class="main">
        <table>
          <tr>
            <th>#</th>
            <th>Asset</th>
            <th>Effective Value</th>
            <th>Market Share</th>
            <th>Cost to 2X Price</th>
            <th>1% Dump</th>
            <th>
              <a class="suggest" href="https://github.com/mappum/cryptodepth.co/issues/new?labels=indicator%20suggestion">
                Suggest An Indicator
              </a>
            </th>
          </tr>
          <tr>
            <td>1</td>
            <td>BTC</td>
            <td>$168,000,000</td>
            <td>60.3%</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </section>
    </body>
  `
}

function store (state, emitter) {

}
