import { useState } from 'react'

// Component for buttons
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
// Component for headers
const Header = ({ content }) => (
  <div>
    <h1>{content}</h1>
  </div>
)
// Component for displaying stats
const DisplayStat = ({ stat, text }) => (
  <div>
    <p>{text} {stat}</p>
  </div>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // functions for changing state
  const addGood = () => {
    setGood(good + 1)
  }
  const addNeutral = () => {
    setNeutral(neutral + 1)
  }
  const addBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header content="give feedback" />
      <Button handleClick={addGood} text="good" />
      <Button handleClick={addNeutral} text="neutral" />
      <Button handleClick={addBad} text="bad" />
      <Header content="statistics" />
      <DisplayStat stat={good} text="good" />
      <DisplayStat stat={neutral} text="neutral" />
      <DisplayStat stat={bad} text="bad" />
    </div>
  )
}

export default App
