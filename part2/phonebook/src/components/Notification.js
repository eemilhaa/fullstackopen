const Notification = ({ message, success }) => {
  const notificationStyle = {
    color: success === true ? "green" : "red",
    fontFamily: "monospace",
    fontSize: 16,
    padding: "1em",
    background: "lightgrey",
    borderRadius: "0.5em",
    marginBottom: "1em",
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
