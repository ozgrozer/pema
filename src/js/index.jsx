import React from 'react'
import ReactDOM from 'react-dom'

import './../css/style.scss'

class App extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  openNewPersonModal () {
    console.log('open modal')
  }

  render () {
    return (
      <div className='container'>
        <div className='container2'>
          <h2>Pema</h2>

          <p>Customizable person management app</p>

          <div className='card'>
            <div className='card-header'>
              <b className='float-left'>Persons</b>
              <button
                id='openNewPersonModal'
                className='float-right btn btn-primary btn-sm'
                onClick={this.openNewPersonModal.bind(this)}
              >
                New
              </button>
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
