import Button from "./Button"

const UserInfo = ({ user, handleLogout }) => {
  return (
    <p>
      Logged in as {user.username}
      <Button onClick={handleLogout} text="logout"/>
    </p>
  )
}

export default UserInfo
