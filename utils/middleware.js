const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken');
//El método request logger que cada vez que se invoca algo se llama
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
//Esto maneja diferentes errores
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  //Si no se encuentra un ID que se invoca, se envia este error
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  //Se envia el contenido del error de validación
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  //Si se intenta utilizar un token que ya expiró, se envía el siguiente error
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  next(error)
}
//Este es el extractor de token
//Esta función extrae el token del header autorización
const tokenExtractor = (request,response, next) => {
  const authorization = request.get('authorization') //Extrae del header autorización del request
  if (authorization && authorization.startsWith('Bearer ')) { //Checa que haya una autorización y que empiece tal como debe de ser
    request.token = authorization.replace('Bearer ', '') //Se quita la palabra Bearer para que solo quede el espacio vacio
  }
  if (authorization && authorization.startsWith('bearer ')) { //Se quita bearer con minúscula
  request.token = authorization.replace('bearer ', '')
  }
  next()
}
//Esta función si en el request existe el token, el token se decodifica con la contraseña
const userExtractor = async (request,response, next) => {
  if(request.token){
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    request.user = await User.findById(decodedToken.id) //Al request el usuario se llena con el usuario que se encuentre con el id del token decodificado
  }
  next()
}
//Todos los modulos de esta utilidad que se exportan cuando se usa el nombre
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}