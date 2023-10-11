const express = require('express')
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const app = express()




app.use(cors())
//Muestra mensajes con Mongoose acerca de si se pudo conectar o no al URI que se necesita
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })
//Se utiliza express y los dos servicios para el logger y el extractor de tokens
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
//Las 3 apis que manejan login, usuarios y blogs
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
//Si el entorno es de testing entonces se pueden usar los comandos de testeo del controlado
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}
//Se usan middlewares de unknownEndpoint y errorHandler por si hay errores
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app