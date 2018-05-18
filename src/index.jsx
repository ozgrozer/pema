import React from 'react'
import ReactDOM from 'react-dom'

const Airtable = require('airtable')
const base = new Airtable({ apiKey: 'keymIMvPa6kpByvRQ' }).base('app0PQJKmsQeEdkhi')

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
const randomColor = () => {
  const letters = '0123456789abcdef'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const select = () => {
  const result = {}

  return new Promise((resolve, reject) => {
    base('persons')
      .select()
      .eachPage((records, fetchNextPage) => {
        records.forEach((record) => {
          const name = record.get('name')
          const age = record.get('age')
          const height = record.get('height')
          result[record.id] = { name, age, height }
        })

        fetchNextPage()
      }, (err) => {
        resolve(result)

        if (err) reject(err)
      })
  })
}

const create = (opts) => {
  return new Promise((resolve, reject) => {
    base('persons').create({
      'name': opts.name,
      'age': opts.age,
      'height': opts.height
    }, (err, record) => {
      resolve(record.getId())

      if (err) reject(err)
    })
  })
}

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      persons: {}
    }
  }

  componentDidMount () {
    select()
      .then((persons) => {
        this.setState({ persons })
      })
  }

  create () {
    const newPerson = {
      name: randomColor(),
      age: randomInt(18, 29),
      height: `1.${randomInt(50, 70)}`
    }

    create({
      name: newPerson.name,
      age: newPerson.age,
      height: newPerson.height
    })
      .then((getId) => {
        const persons = this.state.persons
        persons[getId] = newPerson
        this.setState({ persons })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render () {
    const persons = Object.keys(this.state.persons).map((id) => {
      const person = this.state.persons[id]
      return (
        <tr key={id}>
          <td>{person.name}</td>
          <td>{person.age}</td>
          <td>{person.height}</td>
        </tr>
      )
    })

    return (
      <React.Fragment>
        <button onClick={this.create.bind(this)}>create</button>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>age</th>
              <th>height</th>
            </tr>
          </thead>
          <tbody>
            {persons}
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
