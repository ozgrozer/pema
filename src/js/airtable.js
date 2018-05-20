import Airtable from 'airtable'

const base = new Airtable({ apiKey: 'key4DpLhS2lW7eGvo' }).base('appJS13hsCIu1VvTW')

const airtableCreate = (opts) => {
  return new Promise((resolve, reject) => {
    base(opts.base)
      .create(opts.values, { typecast: true }, (err, record) => {
        if (err) reject(err)
        resolve(record.getId())
      })
  })
}

const airtableSelect = (opts) => {
  const result = {}

  return new Promise((resolve, reject) => {
    base(opts.base)
      .select()
      .eachPage((records, fetchNextPage) => {
        records.forEach((record) => {
          result[record.id] = record.fields
        })

        fetchNextPage()
      }, (err) => {
        if (err) reject(err)
        resolve(result)
      })
  })
}

const airtableUpdate = (opts) => {
  return new Promise((resolve, reject) => {
    base(opts.base)
      .update(opts.id, opts.values, (err, record) => {
        if (err) reject(err)
        resolve(record.getId())
      })
  })
}

module.exports = {
  airtableCreate,
  airtableSelect,
  airtableUpdate
}
