const e = require("cors")
//Función que solo envía un 1, para pruebas
const dummy = (blogs) => {
    return 1
  }
//Función que devuelve cual es el total de likes de los blogs
const totalLikes = (blogs) => {
    wholething = 0
    blogs.map(x => {
        wholething = x.likes + wholething
    })
    return wholething
}
//Función que devuelve cual es el blog favorito, checa todos los blogs viendo cual es el que tiene más likes
const favoriteBlog = (blogs) => {
  bestblog = {
    title: "",
    author: "",
    likes: 0
  }
  blogs.map(x => {
    if(x.likes > bestblog.likes){
      bestblog = x}

  })
  return bestblog
}
//Devuelve cual de los autores tiene más blogs
const mostBlogs = (blogs) => {
  let authors = [] //Se crea un arreglo de autores
  blogs.map(x => {
    if(!(authors.find(x => x.author === authors.author))){ //Se busca si el autor ya está en el arreglo
      authors.push({ //Si no se mete el nombre del autor y cauntos blogs tiene
        author: x.author,
        blogs: blogs.filter(e => e.author === x.author).length //Se filtra en blogs que blogs son de ese autor
      })
    }
  })
  //console.log(authors)

  mostblog = { //Se crea un objeto en blanco
    author: "",
    blogs: 0
  }
  authors.map(x => { //Se va checando quien de todos tiene más blogs con el arreglo que se creó antes
    if(x.blogs > mostblog.blogs){
      mostblog = x}
  })
  return mostblog
}

//Función para checar que autor tiene más likes de todos
const mostLikes = (blogs) =>{
  let authors = []
  blogs.map(x => {
    if(!(authors.find(x => x.author === authors.author))){
      const qnt = blogs.reduce((accumulator, currentValue) => currentValue.author === x.author ? accumulator + currentValue.likes : accumulator + 0,0)
      authors.push({
        author: x.author,
        likes: qnt
      })
    }
  })

  mostAuthorLikes = {
    author: "",
    likes: 0
  }
  authors.map(x => {
    if(x.likes > mostAuthorLikes.likes){
      mostAuthorLikes = x}
  })
  return mostAuthorLikes

}
//Modulos a exportar  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostLikes,
    mostBlogs
  }