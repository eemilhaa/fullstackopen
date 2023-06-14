import { useState, useEffect, useRef } from "react"
import Login from "./components/Login"
import Title from "./components/Title"
import UserInfo from "./components/UserInfo"
import BlogForm from "./components/BlogForm"
import BlogList from "./components/BlogList"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogger")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Title title={user ? "Blogs" : "Log in to application"}/>
      <Notification notification={notification} setNotification={setNotification}/>
      {!user &&
        <Login
          loginService={loginService}
          blogService={blogService}
          setUser={setUser}
          setNotification={setNotification}
        />
      }
      {user &&
        <div>
          <UserInfo user={user} setUser={setUser} />
          <Title title="Create a new blog" />
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              setNotification={setNotification}
              ref={blogFormRef}
            />
          </Togglable>
          <BlogList
            blogs={blogs}
            blogService={blogService}
            setBlogs={setBlogs}
            user={user}
          />
        </div>
      }
    </div>
  )
}

export default App