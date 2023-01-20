import { useState, useEffect } from "react"
import countryService from "./services/countries"
import CountryList from "./components/CountryList"

function App() {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response)
      })
  }, [])
  return (
    <div>
      <h1>Country search</h1>
      <CountryList countries={countries}/>
    </div>
  );
}

export default App;
