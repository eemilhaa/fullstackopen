const listHelper = require("../utils/list_helper")
const blogs = require("./test_helper").blogs

describe("dummy", () => {
  test("returns one", () => {
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }
  ]
  test("of empty  list is zero", () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe("favoriteb blog", () => {
  test("returns correct blog", () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })
})