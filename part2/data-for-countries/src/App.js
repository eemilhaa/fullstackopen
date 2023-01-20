import { useState, useEffect } from "react"
import countryService from "./services/countries"
import CountryDisplay from "./components/CountryDisplay"
import Search from "./components/Search"

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response)
      })
  }, [])
  console.log(countries)

  const getCountriesToShow = () => {
    if (search.length > 0) {
      return countries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    }
    return countries
  }
  const countriesToShow = getCountriesToShow()

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  
  return (
    <div>
      <h1>Country search</h1>
      <Search handleSearch={handleSearch} />
      <CountryDisplay countries={countriesToShow} />
    </div>
  );
}

export default App;
