const ListItem = ({ item }) => {
  return (
    <li>
      {item} 
    </li>
  )
}

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1> {country.name.common} </h1>
      <div>
        Capital: {country.capital} <br/>
        Area: {country.area} <br/>
        Population: {country.population} <br/>
      </div>
      <div>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map(language =>
            <ListItem key={language} item={language} />
          )}
        </ul>
      </div>
    </div>
  )
}

const CountryList = ({ countries }) => {
  return (
    <ul>
      {countries.map((country) =>
        <ListItem
          key={country.name.common}
          item={country.name.common}
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
