import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Login from "./components/Login"
import Title from "./components/Title"
import UserInfo from "./components/UserInfo"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

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
      <Notification message={notification} setMessage={setNotification}/>
      {!user &&
        <Login
          loginService={loginService}
          blogService={blogService}
          setUser={setUser}
        />
      }
      {user &&
        <div>
        <UserInfo user={user} setUser={setUser} />
        <Title title="Create a new blog" />
        <BlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </div>
      }
    </div>
  )
}

export default App