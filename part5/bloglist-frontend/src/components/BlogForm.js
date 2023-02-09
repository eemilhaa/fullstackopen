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
        prompt="title"
        type="text"
        value={title}
        name="title"
        handleChange={handleTitleChange}
      />
      <InputField
        prompt="author"
        type="text"
        value={author}
        name="author"
        handleChange={handleAuthorChange}
      />
      <InputField
        prompt="url"
        type="text"
        value={url}
        name="url"
        handleChange={handleUrlChange}
      />
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
