import { useState } from "react"
import InputField from "./InputField"


const Login = ({ loginService, blogService, setUser }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("logging in with", username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem("loggedBlogger", JSON.stringify(user))
      blogService.setToken(user.token)
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
    <form onSubmit={handleLogin}>
      <InputField
        prompt="username"
        type="text"
        value={username}
        name="Username"
        handleChange={handleUsernameChange}
      />
      <InputField
        prompt="password"
        type="password"
        value={password}
        name="Password"
        handleChange={handlePasswordChange}
      />
      <button type="submit">login</button>
    </form>
  )
}

export default Login
