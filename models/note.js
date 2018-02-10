const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.connect(url)

mongoose.Promise = global.Promise

const Note = mongoose.model('Note', {
    content: String,
    noteState: Boolean
})
  

module.exports = Note
