const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) => {
  const initialValue = 0
  const sum = parts.reduce(
    (accumulator, part) => accumulator + part.exercises,
    initialValue
  )
  return (
    <p>
      <b>Total of {sum} exercises</b>
    </p>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <div>
    {parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </div>

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 2,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 1,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 3,
        id: 3
      },
      {
        name: 'The longest part ever',
        exercises: 4,
        id: 4
      },
      {
        name: 'Fundamentals of React again',
        exercises: 5,
        id: 5
      },
    ]
  }

  return <Course course={course} />
}
export default App
