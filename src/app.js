const express = require('express')
const cors = require('cors')

const { uuid } = require('uuidv4')

const app = express()

app.use(express.json())
app.use(cors())

const repositories = []

app.get('/repositories', (req, res) => {
  return res.json(repositories)
})

app.post('/repositories', (req, res) => {
  const { title, url, techs } = req.body
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository)

  return res.json(repository)
})

app.put('/repositories/:id', (req, res) => {
  const { id } = req.params
  const { title, url, techs } = req.body
  const repository = repositories.find(item => item.id === id)

  if (!repository) {
    return res.status(400).json({ error: 'Repository does not exists.' })
  }

  if (title) {
    repository.title = title
  }

  if (url) {
    repository.url = url
  }

  if (techs) {
    repository.techs = techs
  }

  return res.json(repository)
})

app.delete('/repositories/:id', (req, res) => {
  const { id } = req.params
  const index = repositories.findIndex(item => item.id === id)
  repositories.splice(index, 1)

  if (index === -1) {
    return res.status(400).json({ error: 'Repository does not exists.' })
  }

  return res.status(204).send()
})

app.post('/repositories/:id/like', (req, res) => {
  const { id } = req.params
  const repository = repositories.find(item => item.id === id)

  if (!repository) {
    return res.status(400).json({ error: 'Repository does not exists.' })
  }

  repository.likes = repository.likes + 1
  return res.json(repository)
})

module.exports = app
