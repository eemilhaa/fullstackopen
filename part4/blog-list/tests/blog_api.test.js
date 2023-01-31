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

describe("POST", () =>{
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
    const response = await api.get("/api/blogs")
    const titles = response.body.map(r => r.title)
    expect(response.body).toHaveLength(2 + 1)
    expect(titles).toContain(
      "async/await simplifies making async calls"
    )
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})