import Resact from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import Blog from "./Blog"

const mockUser = {
  id: 123
}

const mockService = jest.fn()
const mockSetter = jest.fn()

test("renders content", () => {
  const blog = {
    id: "1",
    title: "blog",
    author: "writer",
    url: "123",
    user: mockUser,
  }
  render(<Blog
    key={blog.id}
    blog={blog}
    blogService={mockService}
    blogs={[]}
    setBlogs={mockSetter}
    user={mockUser}
  />)
  const title = screen.getByText("blog")
  expect(title).toBeDefined()
})
