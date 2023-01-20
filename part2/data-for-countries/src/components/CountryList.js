const Country = ({ country }) => {
  console.log(country)
  return (
    <li>
      {country.name.common} 
    </li>
  )
}
const CountryList = ({ countries }) => {
  return (
    <ul>
      {countries.map((country) =>
        <Country
          key={country.id}
          country={country}
        />
      )}
    </ul>
  )
}

export default CountryList
