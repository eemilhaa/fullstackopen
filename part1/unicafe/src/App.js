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
const StatisticLine = ({ stat, text }) => (
  <div>
    <p>{text} {stat}</p>
  </div>
)

// Statistics using separate lines
const Statistics = ({ good, neutral, bad, total, sum, positives }) => {
  if (total === 0) {
    return (
      <div>
        <Header content="statistics" />
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <Header content="statistics" />
      <StatisticLine stat={good} text="good" />
      <StatisticLine stat={neutral} text="neutral" />
      <StatisticLine stat={bad} text="bad" />
      <StatisticLine stat={total} text="total" />
      <StatisticLine stat={sum / total} text="average" />
      <StatisticLine stat={positives / total} text="positive (%)" />
    </div>
  )
}

// Statistics as a single html table
const StatisticsTable = ({ good, neutral, bad, total, sum, positives }) => {
  if (total === 0) {
    return (
      <div>
        <Header content="statistics" />
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <Header content="statistics" />
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>total</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{sum / total}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positives}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [sum, setSum] = useState(0)
  const [positives, setPositives] = useState(0)

  // functions for changing state
  const addGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setSum(sum + 1)
    setPositives(positives + 1)
  }
  const addNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }
  const addBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    setSum(sum - 1)
  }

  return (
    <div>
      <Header content="give feedback" />
      <Button handleClick={addGood} text="good" />
      <Button handleClick={addNeutral} text="neutral" />
      <Button handleClick={addBad} text="bad" />
      <StatisticsTable
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        sum={sum}
        positives={positives}
      />
    </div>
  )
}

export default App
