const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const helper = require("./test_helper")
const bcrypt = require("bcrypt")
const User = require("../models/user")

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash })
    await user.save()
  })

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.getAllUsers()
    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    }
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)
    const usersAtEnd = await helper.getAllUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.getAllUsers()
    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    }
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
    expect(result.body.error).toContain("expected `username` to be unique")
    const usersAtEnd = await helper.getAllUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test("creation fails with proper statuscode and message if username missing", async () => {
    const usersAtStart = await helper.getAllUsers()
    const newUser = {
      name: "Superuser",
      password: "salainen",
    }
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
    expect(result.body.error).toContain("User validation failed: username: Path `username` is required.")
    const usersAtEnd = await helper.getAllUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test("creation fails with proper statuscode and message if username too short", async () => {
    const usersAtStart = await helper.getAllUsers()
    const newUser = {
      username: "a",
      name: "Superuser",
      password: "salainen",
    }
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
    expect(result.body.error).toContain("is shorter than the minimum allowed length (3)")
    const usersAtEnd = await helper.getAllUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test("creation fails with proper statuscode and message if password missing", async () => {
    const usersAtStart = await helper.getAllUsers()
    const newUser = {
      username: "name",
      name: "Superuser",
    }
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
    expect(result.body.error).toContain("password missing or too short")
    const usersAtEnd = await helper.getAllUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test("creation fails with proper statuscode and message if username too short", async () => {
    const usersAtStart = await helper.getAllUsers()
    const newUser = {
      username: "asdf",
      name: "Superuser",
      password: "a",
    }
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
    expect(result.body.error).toContain("password missing or too short")
    const usersAtEnd = await helper.getAllUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
