import Button from "./Button"

const UserInfo = ({ user, setUser }) => {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogger")
    setUser(null)
  }
  return (
    <p>
      Logged in as {user.username}
      <Button onClick={handleLogout} text="logout"/>
    </p>
  )
}

export default UserInfo
