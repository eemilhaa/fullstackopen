import { useState } from "react"

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
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
          <button onClick={() => console.log("like")}>like</button>
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