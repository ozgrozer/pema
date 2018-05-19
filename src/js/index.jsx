import React from 'react'
import ReactDOM from 'react-dom'

import './../css/style.scss'

class App extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    return (
      <div className='container'>
        <div className='container2'>
          <h2>Pema</h2>

          <p>Customizable person management app</p>

          <div className='card'>
            <div className='card-header'>
              <b>Persons</b>
            </div>

            <div className='card-body'>
              <div className='list-group list-group-flush'>
                <button className='list-group-item list-group-item-action'>Jack Dorsey</button>
                <button className='list-group-item list-group-item-action'>Bill Gates</button>
                <button className='list-group-item list-group-item-action'>Mark Zuckerberg</button>
                <button className='list-group-item list-group-item-action'>Jeff Bezos</button>
              </div>
            </div>

            <div className='card-footer'>
              4 persons
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
