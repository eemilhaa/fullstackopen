const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const helper = require("./test_helper")

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
})

describe("GET", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("correct number of blogs returned", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(helper.blogs.length)
  })

  test("id field defined", async () => {
    const response = await api.get("/api/blogs")
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
  })
})

describe("POST", () => {
  test("a valid blog can be added ", async () => {
    const newBlog = {
      title: "async/await simplifies making async calls",
      author: "A. Uthor",
      url: "asdf",
      likes: 5
    }
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)
    const response = await helper.getAllBlogs()
    const titles = response.map(r => r.title)
    expect(response).toHaveLength(helper.blogs.length + 1)
    expect(titles).toContain(
      "async/await simplifies making async calls"
    )
  })

  test("a blog added without likes gets 0 likes", async () => {
    const newBlog = {
      title: "unlikable blog",
      author: "A. U. Thor",
      url: "hjkl",
    }
    const result = await api
      .post("/api/blogs")
      .send(newBlog)
    expect(result.body.likes).toBe(0)
  })

  test('fails with status code 400 if data invalid', async () => {
    const newBlog = {
      author: "Uolevi"
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    const blogsAtEnd = await helper.getAllBlogs()
    expect(blogsAtEnd).toHaveLength(helper.blogs.length)
  })
})

describe("DELETE", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.getAllBlogs()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    const blogsAtEnd = await helper.getAllBlogs()
    expect(blogsAtEnd).toHaveLength(
      helper.blogs.length - 1
    )
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})