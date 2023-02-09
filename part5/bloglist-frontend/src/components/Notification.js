import { useEffect } from "react"

const Notification = ({ message, setMessage }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("notif to null")
      setMessage(null)
    }, 3000);
    return () => clearTimeout(timeout)
  }, [message, setMessage])

  if (!message) {
    return null
  }
  return <div> {message} </div>
}

export default Notification
