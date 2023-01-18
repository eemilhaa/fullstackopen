const Notification = ({ message, success}) => {
  const color = success === true ? "green" : "red"
  const notificationStyle = {
    color: color,
    fontFamily: "monospace",
    fontSize: 16,
    paddingBottom: "1em",
  }
  if (message === null) {
    return null
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
