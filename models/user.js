const { Schema, model } = require('mongoose')

const schema = new Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: false
  }
})

module.exports = model('User', schema)