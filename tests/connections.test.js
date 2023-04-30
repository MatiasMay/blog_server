const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

const main = async () => {


test('every blog in list is returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

test('id is called id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(element => {
        expect(element.id).toBeDefined()
    });
})
  
test('a valid blog can be added', async () => {
    const newBlog = {
        title : "20 cute puppies",
        author : "Rose Williams",
        url : "www.wix.com",
        likes : 134
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const contents = blogsAtEnd.map(n => n.title)
  
    expect(contents).toContain(
      '20 cute puppies'
    )
  })

test('a blog without likes defaults to 0', async () => {
    const newBlog = {
        title : "Theory on alien invasions",
        author : "Greg McDonald",
        url : "www.someconspiranoicwebpage.com"
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    blogOnDB = blogsAtEnd.find(x => x.title === newBlog.title)
    expect(blogOnDB.likes).toBe(0)
})

test('a blog without url', async () => {
    const newBlog = {
        title : "My toughts on social media and why it's bad",
        author : "Iroh Nick",
        likes: 10002
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})
test('a blog without title', async () => {
    const newBlog = {
        author : "Danny DeVito",
        url: "www.mytotallyrealwebsite.com",
        likes: 1
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('deleting a blog that doesnt exist', async () => {
  

  const invalidId = '5a3d5da59070081a82a3445'

  await api
    .delete(`/api/blogs/${invalidId}`)
    .expect(400)
})

test('deleting a blog that does exist', async () => {

  const newBlog = {
    title: "A blog that will be deleted",
    author : "Danny DeVito",
    url: "www.mytotallyrealwebsite.com",
    likes: 1
  }
  await api
        .post('/api/blogs')
        .send(newBlog)

  const blogsAtEnd = await helper.blogsInDb()
  const blogOnDB = blogsAtEnd.find(x => x.title === newBlog.title)

  const validId = blogOnDB.id

  await api
    .delete(`/api/blogs/${validId}`)
    .expect(204)
})


test('updating a blog that doesnt exist', async () => {
  const newInfo = {
    title: "A blog that has been updated",
    author : "Danny DeVito",
    url: "www.mytotallyrealwebsite.com",
    likes: 1
  }

  const invalidId = '5a3d5da59070081a82a3445'

  await api
    .put(`/api/blogs/${invalidId}`)
    .send(newInfo)
    .expect(400)
})

test('updating a blog that does exist', async () => {
  const newBlog = {
    title: "A blog that will be updated",
    author : "Danny DeVito",
    url: "www.mytotallyrealwebsite.com",
    likes: 1
  }

  await api
        .post('/api/blogs')
        .send(newBlog)

  const newInfo = {
    title: "A blog that has been updated",
    author : "Danny DeVito",
    url: "www.mytotallyrealwebsite.com",
    likes: 1
  }

  const blogsAtEnd = await helper.blogsInDb()
  const blogOnDB = blogsAtEnd.find(x => x.title === newBlog.title)

  const validId = blogOnDB.id

  await api
    .put(`/api/blogs/${validId}`)
    .send(newInfo)

  const blogsAtEnd2 = await helper.blogsInDb()
  const updatedBlog = blogsAtEnd2.find(x => x.title === newInfo.title)

  expect(updatedBlog).toBeDefined()
})

afterAll(async () => {
  await mongoose.connection.close()
})

}

main()