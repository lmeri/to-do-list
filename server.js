const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')


const Note = require('./models/note')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

let notes = []
  
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/notes', (request, response) => {
    Note
      .find({}, {__v: 0})
      .then(notes => {
        response.json(notes.map(formatNote))
      })
})

app.get('/notes/:id', (request, response) => {
    Note
      .findById(request.params.id)
      .then(note => {
        response.json(formatNote(note))
      })
})

app.post('/notes', (request, response) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({error: 'content missing'})
    }
  
    const note = new Note({
      content: body.content,
      noteState: false
    })
  
    note
      .save()
      .then(savedNote => {
        response.json(formatNote(savedNote))
      })
})

app.delete('/notes/:id', (req, res) => {
    Note
      .findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(204).end();
      })
      .catch(error => {
        res.status(400).send({error: 'malformatted id'});        
      });
});

app.put('/notes/:id', (request, response) => {
    const body = request.body
  
    const note = {
      content: body.content,
      noteState: body.noteState
    }
    console.log(request.params.id)
    Note
      .findByIdAndUpdate(request.params.id, note, { new: true } )
      .then(updatedNote => {
        response.json(formatNote(updatedNote))
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
    })
})

const generateId = () => {
    const maxId = notes.length > 0 ? notes.map(n => n.id).sort().reverse()[0] : 1
    return maxId + 1
}

const formatNote = (note) => {
    return {
      content: note.content,
      noteState: note.noteState,
      id: note._id
    }
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
