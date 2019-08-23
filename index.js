const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
    {
      id: 1,
      name: "Jonne",
      number: "0451231234"
    },
    {
      id: 2,
      name: "Petri",
      number: "0401231234"
    },
    {
      id: 3,
      name: "Matti",
      number: "0501231234"
    },
    {
        id: 4,
        name: "Mikko",
        number: "0101231234"
      }
  ]

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })  

  app.get('/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/info', (request, response) => {
    response.send(
      `<div>
        <h2>Phonebook has info for ${persons.length} people</h2>
        ${Date()}
      </div>`
    )
  })


const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})

