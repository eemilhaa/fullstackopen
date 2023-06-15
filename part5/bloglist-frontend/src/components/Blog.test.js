import Resact from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import { exact } from "prop-types"

const mockUser = {
  id: 123
}

const mockService = jest.fn()
const mockSetter = jest.fn()
const blog = {
  id: "1",
  title: "blog",
  author: "writer",
  url: "url123",
  user: mockUser,
  likes: 10,
}

test("renders content", () => {
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

test("renders url, likes", async () => {
  render(<Blog
    key={blog.id}
    blog={blog}
    blogService={mockService}
    blogs={[]}
    setBlogs={mockSetter}
    user={mockUser}
  />)
  const user = userEvent.setup()
  const button = screen.getByText("view")
  await user.click(button)
  const url = screen.findByText("url123")
  const likes = screen.findByText("10")
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})
