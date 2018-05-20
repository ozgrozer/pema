import React from 'react'
import ReactDOM from 'react-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Airtable from 'airtable'

import './../css/style.scss'
import airtable from './airtable'

const base = new Airtable({ apiKey: airtable.apiKey }).base(airtable.base)

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      newPersonModal: false,
      newPersonFormItems: {},
      personDetailsModal: false,
      personDetailsFormItems: {},
      updateDbStructureModal: false
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

  toggleUpdateDbStructureModal () {
    this.setState({
      updateDbStructureModal: !this.state.updateDbStructureModal
    })
  }

  formValidation (callback, e) {
    e.preventDefault()
    const form = e.target
    form.classList.add('was-validated')

    if (form.checkValidity()) {
      form.classList.remove('was-validated')

      callback()
    } else {
      form.classList.add('was-validated')
    }
  }

  updateDbStructure () {
    console.log('do something')
  }

  addNewPerson () {
    console.log('do something')
    console.log(this.state.newPersonFormItems)
    this.setState({
      newPersonModal: false,
      newPersonFormItems: {}
    })
  }

  render () {
    return (
      <div className='container'>
        <div className='container2'>
          <h2>
            Pema
            <a id='githubIcon' href='https://github.com/ozgrozer/pema' target='_blank'>
              <i className='icon icon-social-octocat' />
            </a>
          </h2>

          <p>Customizable person management app</p>

          <div className='card'>
            <div className='card-header'>
              <b className='float-left'>
                Persons

                <i
                  id='gearIcon'
                  className='icon icon-gear-b'
                  onClick={this.toggleUpdateDbStructureModal.bind(this)}
                />

                <Modal
                  isOpen={this.state.updateDbStructureModal}
                  toggle={this.toggleUpdateDbStructureModal.bind(this)}
                >
                  <form
                    noValidate
                    onSubmit={this.formValidation.bind(this, this.updateDbStructure.bind(this))}
                  >
                    <ModalHeader
                      toggle={this.toggleUpdateDbStructureModal.bind(this)}
                    >
                      DB Structure
                    </ModalHeader>

                    <ModalBody>
                      <div>
                        <textarea
                          required
                          rows='8'
                          placeholder='Structure'
                          className='form-control form-control-lg'
                        />
                        <div className='invalid-feedback'>Required field</div>
                      </div>
                    </ModalBody>

                    <ModalFooter>
                      <button className='btn btn-primary btn-lg btn-block'>Update DB Structure</button>
                    </ModalFooter>
                  </form>
                </Modal>
              </b>

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
              >
                <form
                  noValidate
                  onSubmit={this.formValidation.bind(this, this.addNewPerson.bind(this))}
                >
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
                        className='form-control form-control-lg'
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
                        className='form-control form-control-lg'
                        onChange={this.handleInput.bind(this)}
                        value={this.state.newPersonFormItems.age || ''}
                      />
                      <div className='invalid-feedback'>Required field</div>
                    </div>
                  </ModalBody>

                  <ModalFooter>
                    <button className='btn btn-primary btn-lg btn-block'>Add New Person</button>
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
