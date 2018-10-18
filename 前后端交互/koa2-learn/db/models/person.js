const mongoose = require('mongoose')

let personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  sex: Number // 0女 1男
})

module.exports = mongoose.model('Person', personSchema)
