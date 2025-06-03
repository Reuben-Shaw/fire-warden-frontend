import './App.css';
import React, { useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [number, setNumber] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const wardenData = {
      staffNumber: number,
      firstName: firstName,
      surname: lastName
    };

    try {
      const response = await fetch('https://fire-warden-backend-bucye5b4embadfbv.uksouth-01.azurewebsites.net/addWarden', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(wardenData)
      });

      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data');
    }
  };

  return (
    <div className="App">
      <h1>Fire Warden Tracker</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="Enter First Name"
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Enter Last Name"
          />
        </div>
        <div>
          <label>Number:</label>
          <input
            type="text"
            value={number}
            onChange={handleNumberChange}
            placeholder="Enter a Number"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
