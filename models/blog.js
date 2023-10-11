require('dotenv').config()
const config = require('../utils/config')
const mongoose = require('mongoose')
//El esquema de blogs con atributos y que propiedades tienen los atributos
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
//Se borra el id y_v del blogSchema
blogSchema.set('toJSON',{
    transform: (document,returnedObject)=>{
        returnedObject.id =returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog',blogSchema)