const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
//Aquí se dan los comandos para logear
//Permite postear un request para que un usuario pueda logearse
loginRouter.post('/', async (request, response) => {
  //Se consiguen el usuario y contraseña del cuerpo
  const { username, password } = request.body


  const user = await User.findOne({ username })
  const passwordCorrect = user === null //Se verifica que el usuario sea null
    ? false //Si es así se devuelve falso
    : await bcrypt.compare(password, user.passwordHash) //De otro modo se verifica si la contraseña es correta con la que está en la base de datos


  if (!(user && passwordCorrect)) { //Se verifica que ambos campos sean correctos
    return response.status(401).json({ //De otro modo se devuelve error
      error: 'invalid username or password'
    })
  }


  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign( //Se crea el token que se guardará en el almacenamiento local para poder entrar al servidor
    userForToken, 
    process.env.SECRET,
    { expiresIn: 60*60 }
  )

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter