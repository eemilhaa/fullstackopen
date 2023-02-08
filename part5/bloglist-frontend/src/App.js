import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Login from "./components/Login"
import Title from "./components/Title"
import UserInfo from "./components/UserInfo"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("logging in with", username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log("error")
    }
  }

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  return (
    <div>
      <Title title={user ? "Blogs" : "Log in to application"}/>
      {!user &&
        <Login
          username={username}
          password={password}
          handlePasswordChange={handlePasswordChange}
          handleUsernameChange={handleUsernameChange}
          handleLogin={handleLogin}
        />
      }
      {user &&
        <div>
        <UserInfo user={user} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </div>
      }
    </div>
  )
}

export default App