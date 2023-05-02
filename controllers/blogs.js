const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
//
const User = require('../models/user')
const jwt = require('jsonwebtoken')
//

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user', { username: 1, name: 1, id:1 })
  response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const user = request.user
    if(!request.token || !user){
      return response.status(401).json({ error: 'token invalid' })
    }
    blog.user = user.id
    const savedBlog = await blog.save()
    user.blogs = await user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  })

  blogsRouter.delete('/:id', async (request, response) => {
    const user = request.user
    blogcheck = await Blog.findById(request.params.id)
    if(blogcheck === null){
      return response.status(400).json({error: 'no blog with that id'})
    }
    if( !user ||user.id !== blogcheck.user.toString())
      {return response.status(401).json({error: 'no permission to delete this post'})}

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })
  
  blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body
  
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
  }
  
    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      .then(updatedBlog => {
        response.json(updatedBlog)
      })
      .catch(error => next(error))
  })

  module.exports = blogsRouter