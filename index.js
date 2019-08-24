const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
morgan.token('post', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.post(req, res)
  ].join(' ')
}))

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

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
  
    if (!body.name) {
      return response.status(400).json({
        error: 'name missing'
      })
    } else if (!body.number) {
      return response.status(400).json({
        error: 'number missing'
      })
    } else if (persons.find(person => person.name === body.name)) {
      return response.status(400).json({
        error: 'person is already included'
      })
    }
  
    const person = {
      id: Math.random() * (1000 - 1),
      name: body.name,
      number: body.number
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })
  

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.get('/info', (request, response) => {
    response.send(
      `<div>
        <h2>Phonebook has info for ${persons.length} people</h2>
        ${Date()}
      </div>`
    )
  })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})

