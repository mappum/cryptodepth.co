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
            <th></th>
            <th>Asset</th>
            <th>Demand</th>
            <th></th>
          </tr>
          <tr>
            <td>X</td>
            <td>Bitcoin</td>
            <td>$168,000,000</td>
            <td></td>
          </tr>
        </table>
      </section>
    </body>
  `
}

function store (state, emitter) {

}
