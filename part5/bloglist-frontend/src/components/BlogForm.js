import { useState } from "react"
import blogService from "../services/blogs"

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
      <div>
        title
          <input
          type="text"
          value={title}
          name="title"
          onChange={handleTitleChange}
          />
      </div>
      <div>
        author
          <input
          type="text"
          value={author}
          name="author"
          onChange={handleAuthorChange}
          />
      </div>
      <div>
        url
          <input
          type="text"
          value={url}
          name="url"
          onChange={handleUrlChange}
          />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
