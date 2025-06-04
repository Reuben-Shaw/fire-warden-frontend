import { useEffect, useState } from 'react';
import EntryList from '../objects/EntryList';
import Header from '../objects/Header';
import EntryPopup from '../objects/EntryPopup';
import config from '../config';
import './WardenLocation.css';

function WardenLocation({ staffNumber }) {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch(
          `${config.apiBaseUrl}/getEntriesByNumber/${staffNumber}`
        );
        const data = await res.json();

        if (data.success) {
          setEntries(data.data);
        } else {
          setError(data.message || 'Failed to fetch entries');
        }
      } catch (err) {
        console.error('Error fetching entries:', err);
        setError('Something went wrong while fetching entries');
      }
    };
    const fetchBuildings = async () => {
      try {
        const res = await fetch(
          `${config.apiBaseUrl}/getAllBuildings?`
        );
        const data = await res.json();

        if (data.success) {
          setBuildings(data.data);
        } else {
          setError(data.message || 'Failed to fetch buildings');
        }
      } catch (err) {
        console.error('Error fetching buildings:', err);
        setError('Something went wrong while fetching buildings');
      }
    };

    fetchEntries();
    fetchBuildings();
  }, [staffNumber]);

  const handleLeave = async (entryId) => {
    const registerData = {
      entry_id: entryId,
      time_now: new Date().toISOString()
    };

    try {
      const response = await fetch(`${config.apiBaseUrl}/leaveBuilding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      });

      const result = await response.json();

      if (result.success) {
        const updated = await fetch(`${config.apiBaseUrl}/getEntriesByNumber/${staffNumber}`);
        const updatedData = await updated.json();

        if (updatedData.success) {
          setEntries(updatedData.data);
        } else {
          alert('Left, but failed to refresh list');
        }
      } else {
        alert(result.message || 'Leaving Failed');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data');
    }
  };

  const handleAdd = async (time, selectedBuilding) => {
    const dateNow = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const dateTime = new Date(
      dateNow.getFullYear(),
      dateNow.getMonth(),
      dateNow.getDate(),
      hours,
      minutes,
      0
    );
    const utcDatetime = dateTime.toISOString();

    const registerData = {
      staff_number: staffNumber,
      building_id: selectedBuilding,
      entry_datetime: `${utcDatetime}`
    };

    try {
      const response = await fetch(`${config.apiBaseUrl}/addEntry?`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      });

      const result = await response.json();
      if (result.success) {
          const updated = await fetch(`${config.apiBaseUrl}/getEntriesByNumber/${staffNumber}`);
          const updatedData = await updated.json();

          if (updatedData.success) {
            setEntries(updatedData.data);
          } else {
            alert('Added new entry, but unable to refresh list');
          }
        } else {
          alert(result.message || 'Adding new entry failed');
        }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data');
    }
  };

  return (
    <div>
      <Header />
      <div className='warden-location-page'>
        <div className='top-bar'>
          <h1>Building Entry Logs</h1>
          <button onClick={() => setShowPopup(true)}>+ Add Entry</button>
          {showPopup && (
            <EntryPopup
              buildings={buildings}
              onAdd={handleAdd}
              onCancel={() => setShowPopup(false)}
            />
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <p></p>
        <EntryList entries={entries} onLeaveBuilding={handleLeave} />
      </div>
    </div>
  );
}

export default WardenLocation;