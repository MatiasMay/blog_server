const listHelper = require('../utils/list_helper')


test('dummy returns one', async () => {
  const blogs = []

  const result = await listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', async () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const listWithTwoBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
          }
      ]

      const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
      ]
      
      
  
    test('when list has only one blog, equals the likes of that', async () => {
      const result = await listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('when list has two blogs, equals the likes of that', async () => {
        const result = await listHelper.totalLikes(listWithTwoBlogs)
        expect(result).toBe(12)
      })

    test('check which blog has the most likes', async () => {
      expected = {
            likes: 12
      }
      const result = await listHelper.favoriteBlog(blogs)
      expect(result.likes).toEqual(expected.likes)
    })

    test('check the author with the most blogs', async ()=> {
      expected = {
        author: "Robert C. Martin",
        blogs: 3
      }
      const result = await listHelper.mostBlogs(blogs)
      expect(result).toEqual(expected)
    })

    test('check the author with the most likes',async ()=> {
      expected = {
        author: "Edsger W. Dijkstra",
        likes: 17
      }
      const result = await listHelper.mostLikes(blogs)
      expect(result).toEqual(expected)
    })

  })