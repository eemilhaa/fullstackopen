const Course = ({ course }) =>
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>

const Header = ({ name }) => <h1>{name}</h1>

const Content = ({ parts }) => 
  <div>
    {parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </div>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

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

export default Course
