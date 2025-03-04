
import React, { useState } from 'react';
import CountryList from './components/CountryList';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);

  const addCountry = () => {
    const name = prompt('Enter country name:');
    if (name?.trim()) {
      setCountries([...countries, { id: Date.now(), name: name.trim(), states: [] }]);
    }
  };

  const editCountry = (countryId) => {
    const country = countries.find(c => c.id === countryId);
    const newName = prompt('Enter new country name:', country.name);
    
    if (newName?.trim() && window.confirm('Are you sure you want to update this country?')) {
      setCountries(countries.map(c => 
        c.id === countryId ? { ...c, name: newName.trim() } : c
      ));
    }
  };

  const deleteCountry = (countryId) => {
    if (window.confirm('Are you sure you want to delete this country? All states and cities will be deleted.')) {
      setCountries(countries.filter(c => c.id !== countryId));
    }
  };

  const addState = (countryId) => {
    const name = prompt('Enter state name:');
    if (name?.trim()) {
      setCountries(countries.map(country => 
        country.id === countryId
          ? { ...country, states: [...country.states, { id: Date.now(), name: name.trim(), cities: [] }] }
          : country
      ));
    }
  };

  const editState = (countryId, stateId) => {
    const country = countries.find(c => c.id === countryId);
    const state = country.states.find(s => s.id === stateId);
    const newName = prompt('Enter new state name:', state.name);

    if (newName?.trim() && window.confirm('Are you sure you want to update this state?')) {
      setCountries(countries.map(c => 
        c.id === countryId
          ? {
              ...c,
              states: c.states.map(s => 
                s.id === stateId ? { ...s, name: newName.trim() } : s
              )
            }
          : c
      ));
    }
  };

  const deleteState = (countryId, stateId) => {
    if (window.confirm('Are you sure you want to delete this state? All cities will be deleted.')) {
      setCountries(countries.map(country => 
        country.id === countryId
          ? {
              ...country,
              states: country.states.filter(state => state.id !== stateId)
            }
          : country
      ));
    }
  };

  const addCity = (countryId, stateId) => {
    const name = prompt('Enter city name:');
    if (name?.trim()) {
      setCountries(countries.map(country => 
        country.id === countryId
          ? {
              ...country,
              states: country.states.map(state => 
                state.id === stateId
                  ? { ...state, cities: [...state.cities, { id: Date.now(), name: name.trim() }] }
                  : state
              )
            }
          : country
      ));
    }
  };

  const deleteCity = (countryId, stateId, cityId) => {
    if (window.confirm('Are you sure you want to delete this city?')) {
      setCountries(countries.map(country => 
        country.id === countryId
          ? {
              ...country,
              states: country.states.map(state => 
                state.id === stateId
                  ? {
                      ...state,
                      cities: state.cities.filter(city => city.id !== cityId)
                    }
                  : state
              )
            }
          : country
      ));
    }
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1 className="app-title">
          Country, State, and City Management
        </h1>
        <button onClick={addCountry} className="add-button">
          Add New Country
        </button>
      </div>
      {countries.length === 0 ? (
        <div className="empty-state">
          <h2>No countries added yet</h2>
          <p>Click the button above to add your first country</p>
        </div>
      ) : (
        <CountryList
          countries={countries}
          onEditCountry={editCountry}
          onDeleteCountry={deleteCountry}
          onAddState={addState}
          onEditState={editState}
          onDeleteState={deleteState}
          onAddCity={addCity}
          onDeleteCity={deleteCity}
        />
      )}
    </div>
  );
}

export default App;