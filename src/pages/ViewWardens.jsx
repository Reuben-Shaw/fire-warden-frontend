import { useEffect, useState } from 'react';
import WardenEntryList from '../objects/WardenEntryList';
import Header from '../objects/Header';
import WardenPopup from '../objects/WardenPopup';
import '../App.css';
import config from '../config'

function ViewWarden() {
  // React hooks for updating the entry list
  const [entries, setEntries] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // useEffect runs on page load
  useEffect(() => {
    const fetchWardens = async () => {
      try {
        // API endpoint call
        const res = await fetch(
          `${config.apiBaseUrl}/getWardensLastLoc`
        );
        const data = await res.json();

        // API message success checker
        if (data.success) {
          setEntries(data.data);
        } else {
          alert(data.message || 'Failed to fetch entries');
        }
      } catch (err) {
        console.error('Error fetching entries:', err);
        alert('Something went wrong while fetching entries');
      }
    }
    fetchWardens();
  },[]); // [] means it'll only run once

  const handleAdd = async (staffNumber) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/addWarden?`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ staff_number: staffNumber })
      });

      const result = await response.json();
      if (result.success) {
          alert('Successfully added warden');
      } else {
        alert(result.message || 'Adding warden failed');
      }
    } catch (error) {
      console.error('Error adding warden:', error);
      alert('Failed to add warden');
    }
  }

  // Frontend display
  return (
    <div>
      <Header />
      <div className='warden-location-page'>
        <button onClick={() => setShowPopup(true)}>+ Add Warden</button>
        {showPopup && (
          <WardenPopup
            onAdd={handleAdd}
            onCancel={() => setShowPopup(false)}
          />
        )}
        <WardenEntryList
          wardenEntries={entries} 
        />
      </div>
    </div>
  );
}

export default ViewWarden;