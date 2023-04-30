const e = require("cors")

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    wholething = 0
    blogs.map(x => {
        wholething = x.likes + wholething
    })
    return wholething
}

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

const mostBlogs = (blogs) => {
  let authors = []
  blogs.map(x => {
    if(!(authors.find(x => x.author === authors.author))){
      authors.push({
        author: x.author,
        blogs: blogs.filter(e => e.author === x.author).length
      })
    }
  })
  //console.log(authors)

  mostblog = {
    author: "",
    blogs: 0
  }
  authors.map(x => {
    if(x.blogs > mostblog.blogs){
      mostblog = x}
  })
  return mostblog
}


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
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostLikes,
    mostBlogs
  }