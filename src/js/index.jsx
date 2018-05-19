import React from 'react'
import ReactDOM from 'react-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import './../css/style.scss'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      newPersonModal: false,
      newPersonFormItems: {},
      personDetailsModal: false,
      personDetailsFormItems: {}
    }
  }

  handleInput (e) {
    const item = e.target
    const newPersonFormItems = this.state.newPersonFormItems
    newPersonFormItems[item.name] = item.value
    this.setState({ newPersonFormItems })
  }

  toggleNewPersonModal () {
    this.setState({
      newPersonModal: !this.state.newPersonModal
    })
  }

  addNewPerson (e) {
    e.preventDefault()
    const form = e.target
    form.classList.add('was-validated')

    if (form.checkValidity()) {
      form.classList.remove('was-validated')

      console.log('do something')
      console.log(this.state.newPersonFormItems)
      this.setState({
        newPersonModal: false,
        newPersonFormItems: {}
      })
    } else {
      form.classList.add('was-validated')
    }
  }

  render () {
    return (
      <div className='container'>
        <div className='container2'>
          <h2>
            Pema
            <a id='githubIcon' href='https://github.com/ozgrozer/pema' target='_blank'>
              <svg viewBox='0 0 16 16' version='1.1'>
                <path fill-rule='evenodd' d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
              </svg>
            </a>
          </h2>

          <p>Customizable person management app</p>

          <div className='card'>
            <div className='card-header'>
              <b className='float-left'>Persons</b>

              <button
                id='openNewPersonModal'
                className='float-right btn btn-primary btn-sm'
                onClick={this.toggleNewPersonModal.bind(this)}
              >
                New
              </button>

              <Modal
                isOpen={this.state.newPersonModal}
                toggle={this.toggleNewPersonModal.bind(this)}
                className={this.props.className}
              >
                <form noValidate onSubmit={this.addNewPerson.bind(this)}>
                  <ModalHeader
                    toggle={this.toggleNewPersonModal.bind(this)}
                  >
                    New Person
                  </ModalHeader>

                  <ModalBody>
                    <div className='form-group'>
                      <label htmlFor='fullname'>Fullname</label>
                      <input
                        required
                        type='text'
                        id='fullname'
                        name='fullname'
                        className='form-control'
                        onChange={this.handleInput.bind(this)}
                        value={this.state.newPersonFormItems.fullname || ''}
                      />
                      <div className='invalid-feedback'>Required field</div>
                    </div>

                    <div>
                      <label htmlFor='age'>Age</label>
                      <input
                        required
                        type='text'
                        id='age'
                        name='age'
                        className='form-control'
                        onChange={this.handleInput.bind(this)}
                        value={this.state.newPersonFormItems.age || ''}
                      />
                      <div className='invalid-feedback'>Required field</div>
                    </div>
                  </ModalBody>

                  <ModalFooter>
                    <button className='btn btn-primary btn-block'>Add</button>
                  </ModalFooter>
                </form>
              </Modal>
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
