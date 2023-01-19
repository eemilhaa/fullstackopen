import { useState, useEffect } from "react"
import countryService from "./services/countries"

function App() {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response)
      })
  }, [])
  console.log(countries)

  return (
    <h1>Country search</h1>
  );
}

export default App;
