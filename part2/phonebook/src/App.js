import { useState, useEffect } from "react";
import personService from "./services/persons"
import AdditionForm from "./components/AdditionForm"
import Persons from "./components/Persons"
import Search from "./components/Search"


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const getPersonsToShow = () => {
    if (search.length > 0) {
      return persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return persons;
  };
  const personsToShow = getPersonsToShow();

  return (
    <div>
      <h2>Phonebook</h2>
      <AdditionForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Search handleSearch={handleSearch} />
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
