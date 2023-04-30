const Blog = require('../models/blog')

const initialBlogs = [
    {
      title : "Things I like doing at school",
      author : "Matthew May",
      url : "www.google.com",
      likes : 20
    },
    {
      title : "Why the things that Matthew May likes doing at school are dumb",
      author : "Jules Mikhalov",
      url : "www.bing.com",
      likes : 230
    },
  ]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}