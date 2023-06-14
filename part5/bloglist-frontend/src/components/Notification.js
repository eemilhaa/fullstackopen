import { useEffect } from "react"

const Notification = ({ notification, setNotification }) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log(notification)
      setNotification(null)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [notification, setNotification])

  if (!notification) {
    return null
  }
  return <p> {notification} </p>
}

export default Notification
