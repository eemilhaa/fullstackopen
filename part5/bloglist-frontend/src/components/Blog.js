import { useState } from "react"

const Blog = ({ blog, blogService, blogs, setBlogs, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  if (!blog.likes) {
    blog.likes = 0
  }

  const deletable = blog.user.id === user.id || blog.user === user.id
  
  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    const blogObject = {...blog, user: blog.user.id, likes: blog.likes + 1}
    const retrurnedBlog = await blogService.update(blogObject)
    setBlogs(blogs.map(blog => blog.id === blogObject.id ? retrurnedBlog : blog))
  }

  const handleDelete = async () => {
    console.log(blog)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const blogToDelete = blog
      await blogService.deleteBlog(blogToDelete)
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
    }
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
          {blog.url}
          <br/>
          {blog.likes}
          <button onClick={handleLike}>like</button>
          <br/>
          {blog.author} <br/>
          <br/>
          {deletable &&
            <button onClick={handleDelete}>delete</button>
          }
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