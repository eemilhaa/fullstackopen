import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Login from "./components/Login"
import blogService from "./services/blogs"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  }

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)
  
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <h2>Login</h2>
        <Login
          username={username}
          password={password}
          handlePasswordChange={handlePasswordChange}
          handleUsernameChange={handleUsernameChange}
          handleLogin={handleLogin}
        />
    </div>
  )
}

export default App