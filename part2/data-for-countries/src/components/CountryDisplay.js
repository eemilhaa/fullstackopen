const CountryName = ({ country }) => {
  return (
    <li>
      {country.name.common} 
    </li>
  )
}

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1> {country.name.common} </h1>
      Capital: {country.capital}
      Area: {country.area}
      Population: {country.population}

    </div>
  )
}

const CountryList = ({ countries }) => {
  return (
    <ul>
      {countries.map((country) =>
        <CountryName
          key={country.name.common}
          country={country}
        />
      )}
    </ul>
  )
}

const CountryDisplay = ({ countries }) => {
  if (countries.length === 1) {
    const country = countries[0]
    return (
      <CountryInfo
        key={country.name.common}
        country={country}
      />
    )
  }
  return <CountryList countries={countries} />
}

export default CountryDisplay
