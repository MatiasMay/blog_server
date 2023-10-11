require('dotenv').config()
//La configuración del servidor, sacada del .env
//El puerto que se va a utilizar
const PORT = process.env.PORT
//El URI de MondoDB que se utilizará, depende de si está en modo testeo o no
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
//MONGODB_URI = process.argv[2]
//Se exportan el URI y el puerto
module.exports = {
  MONGODB_URI,
  PORT
}