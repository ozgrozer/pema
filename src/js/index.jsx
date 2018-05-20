import React from 'react'
import ReactDOM from 'react-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import './../css/style.scss'
import { airtableCreate, airtableSelect, airtableUpdate, airtableDestroy } from './airtable'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      persons: {},
      fields: [],
      totalPerson: 0,

      newPersonModal: false,
      newPersonFormItems: {},

      selectedPersonId: 0,
      personDetailsModal: false,
      personDetailsFormItems: {}
    }
  }

  componentDidMount () {
    airtableSelect({
      base: 'persons'
    })
      .then((persons) => {
        const totalPerson = Object.keys(persons).length

        if (totalPerson > 0) {
          const firstPersonId = Object.keys(persons)[0]
          const firstPerson = persons[firstPersonId]
          const fields = Object.keys(firstPerson)

          this.setState({
            fields,
            persons,
            totalPerson
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  toggleNewPersonModal () {
    this.setState({
      newPersonModal: !this.state.newPersonModal
    })
  }

  togglePersonDetailsModal (personId) {
    const personDetailsFormItems = personId ? this.state.persons[personId] : {}

    this.setState({
      personDetailsFormItems,
      selectedPersonId: personId,
      personDetailsModal: !this.state.personDetailsModal
    })
  }

  handleNewPersonInput (e) {
    const item = e.target
    const newPersonFormItems = this.state.newPersonFormItems
    newPersonFormItems[item.name] = item.value
    this.setState({ newPersonFormItems })
  }

  handlePersonDetailsInput (e) {
    const item = e.target
    const personDetailsFormItems = this.state.personDetailsFormItems
    personDetailsFormItems[item.name] = item.value
    this.setState({ personDetailsFormItems })
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
        const persons = this.state.persons
        persons[getId] = this.state.newPersonFormItems
        const totalPerson = Object.keys(persons).length

        this.setState({
          persons,
          totalPerson,
          newPersonModal: false,
          newPersonFormItems: {}
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  updatePerson () {
    airtableUpdate({
      base: 'persons',
      id: this.state.selectedPersonId,
      values: this.state.personDetailsFormItems
    })
      .then((getId) => {
        this.setState({
          personDetailsModal: false
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  deletePerson (personId, e) {
    e.preventDefault()
    e.stopPropagation()

    airtableDestroy({
      base: 'persons',
      id: personId
    })
      .then((deletedId) => {
        const persons = this.state.persons
        delete persons[deletedId]
        const totalPerson = Object.keys(persons).length

        this.setState({
          persons,
          totalPerson
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render () {
    let totalPersonDiv
    if (this.state.totalPerson > 1) {
      totalPersonDiv = <div>{this.state.totalPerson} persons</div>
    } else {
      totalPersonDiv = <div>{this.state.totalPerson} person</div>
    }

    const personsDiv = Object.keys(this.state.persons).map((personId) => {
      const person = this.state.persons[personId]
      return (
        <button
          key={personId}
          onClick={this.togglePersonDetailsModal.bind(this, personId)}
          className='list-group-item list-group-item-action'>
          {person[this.state.fields[0]]}

          <div
            className='btn btn-danger btn-sm deletePerson'
            onClick={this.deletePerson.bind(this, personId)}>
            Delete
          </div>
        </button>
      )
    })

    let newPersonFormDiv
    let personDetailsFormDiv
    if (this.state.fields.length > 0) {
      newPersonFormDiv = this.state.fields.map((field, i) => {
        return (
          <div key={i} className='form-group'>
            <label
              htmlFor={`newPersonFormItem${i}`}>
              {field}
            </label>

            <input
              required
              type='text'
              name={field}
              id={`newPersonFormItem${i}`}
              className='form-control form-control-lg'
              onChange={this.handleNewPersonInput.bind(this)}
              value={this.state.newPersonFormItems[field] || ''} />
            <div className='invalid-feedback'>Required field</div>
          </div>
        )
      })

      personDetailsFormDiv = this.state.fields.map((field, i) => {
        return (
          <div key={i} className='form-group'>
            <label
              htmlFor={`personDetailsFormItem${i}`}>
              {field}
            </label>

            <input
              required
              type='text'
              name={field}
              id={`personDetailsFormItem${i}`}
              className='form-control form-control-lg'
              onChange={this.handlePersonDetailsInput.bind(this)}
              value={this.state.personDetailsFormItems[field] || ''} />
            <div className='invalid-feedback'>Required field</div>
          </div>
        )
      })
    }

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

              {this.state.totalPerson > 0 ? (
                <button
                  id='openNewPersonModal'
                  className='float-right btn btn-primary btn-sm'
                  onClick={this.toggleNewPersonModal.bind(this)}>
                  New
                </button>
              ) : ''}

              <Modal
                isOpen={this.state.newPersonModal}
                toggle={this.toggleNewPersonModal.bind(this)}>
                <form
                  noValidate
                  onSubmit={this.formValidation.bind(this, this.addNewPerson.bind(this))}>
                  <ModalHeader
                    toggle={this.toggleNewPersonModal.bind(this)}>
                    New Person
                  </ModalHeader>

                  <ModalBody>
                    {newPersonFormDiv}
                  </ModalBody>

                  <ModalFooter>
                    <button className='btn btn-primary btn-lg btn-block'>Add New Person</button>
                  </ModalFooter>
                </form>
              </Modal>
            </div>

            <div className='card-body'>
              <div className='list-group list-group-flush'>
                {personsDiv}

                <Modal
                  isOpen={this.state.personDetailsModal}
                  toggle={this.togglePersonDetailsModal.bind(this, '')}>
                  <form
                    noValidate
                    onSubmit={this.formValidation.bind(this, this.updatePerson.bind(this))}>
                    <ModalHeader
                      toggle={this.togglePersonDetailsModal.bind(this, '')}>
                      {this.state.personDetailsFormItems[this.state.fields[0]] || ''}
                    </ModalHeader>

                    <ModalBody>
                      {personDetailsFormDiv}
                    </ModalBody>

                    <ModalFooter>
                      <button className='btn btn-primary btn-lg btn-block'>Update Person</button>
                    </ModalFooter>
                  </form>
                </Modal>
              </div>
            </div>

            <div className='card-footer'>
              {totalPersonDiv}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
