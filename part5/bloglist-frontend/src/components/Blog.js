import { useState } from "react"

const Blog = ({ blog, blogService, blogs, setBlogs }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    const blogObject = {...blog, user: blog.user.id, likes: blog.likes + 1}
    const retrurnedBlog = await blogService.update(blogObject)
    setBlogs(blogs.map(blog => blog.id === blogObject.id ? retrurnedBlog : blog))
  }

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    borderColor: "lightgray",
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {showDetails &&
        <div>
          {blog.title}
          <button onClick={toggleShowDetails}>hide</button>
          <br/>
          {blog.url} <br/>
          {blog.likes}
          <button onClick={handleLike}>like</button>
          <br/>
          {blog.author} <br/>
        </div>
      }
      {!showDetails &&
        <div>
          {blog.title}
          <button onClick={toggleShowDetails}>view</button>
        </div>
      }
    </div>
  )
}

export default Blog