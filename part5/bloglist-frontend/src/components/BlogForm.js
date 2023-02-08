import { useState } from "react"
import blogService from "../services/blogs"
import InputField from "./InputField"

const BlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleTitleChange = ({ target }) => setTitle(target.value)
  const handleAuthorChange = ({ target }) => setAuthor(target.value)
  const handleUrlChange = ({ target }) => setUrl(target.value)

  const handleBlogPost = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    const retrurnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(retrurnedBlog))
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <form onSubmit={handleBlogPost}>
      <InputField
        text={"title"}
        value={title}
        handleChange={handleTitleChange}
      />
      <InputField
        text={"author"}
        value={author}
        handleChange={handleAuthorChange}
      />
      <InputField
        text={"url"}
        value={url}
        handleChange={handleUrlChange}
      />
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
