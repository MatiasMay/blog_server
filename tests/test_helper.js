const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [
  {
    username:"matias",
    name:"MatiasMay",
    password:"nahui"
}
]

const userToToken = {
  username: "matias",
  password:"nahui"
}

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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}


module.exports = {
  initialBlogs, initialUsers, userToToken, nonExistingId, blogsInDb, usersInDb
}