import React from 'react'
import ReactDOM from 'react-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import './../css/style.scss'
import { airtableCreate, airtableSelect } from './airtable'

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

  componentDidMount () {
    airtableSelect({
      base: 'persons'
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
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

  addNewPerson () {
    airtableCreate({
      base: 'persons',
      values: this.state.newPersonFormItems
    })
      .then((getId) => {
        console.log(getId)

        this.setState({
          newPersonModal: false,
          newPersonFormItems: {}
        })
      })
      .catch((err) => {
        console.log(err)
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
                        name='Fullname'
                        className='form-control form-control-lg'
                        onChange={this.handleInput.bind(this)}
                        value={this.state.newPersonFormItems['Fullname'] || ''}
                      />
                      <div className='invalid-feedback'>Required field</div>
                    </div>

                    <div>
                      <label htmlFor='age'>Age</label>
                      <input
                        required
                        type='text'
                        id='age'
                        name='Age'
                        className='form-control form-control-lg'
                        onChange={this.handleInput.bind(this)}
                        value={this.state.newPersonFormItems['Age'] || ''}
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
