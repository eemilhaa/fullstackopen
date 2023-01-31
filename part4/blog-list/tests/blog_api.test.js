const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const blogs = require("./test_data")

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(blogs[0])
  await blogObject.save()
  blogObject = new Blog(blogs[1])
  await blogObject.save()
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
    expect(response.body).toHaveLength(2)
  })

  test("id field defined", async () => {
    const response = await api.get("/api/blogs")
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})