import { useEffect, useState } from 'react';
import EntryList from '../objects/EntryList';
import Header from '../objects/Header';
import EntryPopup from '../objects/EntryPopup';
import config from '../config';
import './WardenLocation.css';

function WardenLocation({ staffNumber }) {
  const [entries, setEntries] = useState([]);
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
          alert(data.message || 'Failed to fetch entries');
        }
      } catch (err) {
        console.error('Error fetching entries:', err);
        alert('Something went wrong while fetching entries');
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
          alert(data.message || 'Failed to fetch buildings');
        }
      } catch (err) {
        console.error('Error fetching buildings:', err);
        alert('Something went wrong while fetching buildings');
      }
    };

    fetchEntries();
    fetchBuildings();
  }, [staffNumber]);

  const handleLeave = async (entryID) => {
    const leaveData = {
      entry_id: entryID,
      time_now: new Date().toISOString()
    };

    try {
      const response = await fetch(`${config.apiBaseUrl}/leaveBuilding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(leaveData)
      });

      const result = await response.json();

      if (result.success) {
          updateList();
      } else {
        alert(result.message || 'Leaving Failed');
      }
    } catch (error) {
      console.error('Error leaving building:', error);
      alert('Failed to leave building');
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

    const updateLocationData = {
      staff_number: staffNumber,
      time_now: new Date().toISOString()
    };

    try {
      const leaveResponse = await fetch(`${config.apiBaseUrl}/leaveBuildingFromAdd`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateLocationData)
      });

      const leaveResult = await leaveResponse.json();

      if (leaveResult.success) {
        const addData = {
          staff_number: staffNumber,
          building_id: selectedBuilding,
          entry_datetime: `${utcDatetime}`
        };

        const addResponse = await fetch(`${config.apiBaseUrl}/addEntry?`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(addData)
        });

        const addResult = await addResponse.json();

        if (addResult.success) {
          updateList();
        } else {
          alert(addResult.message || 'Adding new entry failed after leaving previous one.');
        }
      } else {
        alert(leaveResult.message || 'Failed to leave previous building. Entry not added.');
      }
    } catch (error) {
      console.error('Error updating entry:', error);
      alert('Failed to update building entry.');
    }
  };

  const handleUpdate = async (entryID, newBuilding, newEntry, newExit) => {
    const updateData = {
      entry_id: entryID,
      building_id: newBuilding,
      entry_datetime: newEntry,
      exit_datetime: newExit
    };

    try {
      const response = await fetch(`${config.apiBaseUrl}/updateEntry?`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      const result = await response.json();
      if (result.success) {
          updateList();
      } else {
        alert(result.message || 'Updating entry failed');
      }
    } catch (error) {
      console.error('Error updating entry:', error);
      alert('Failed to update entry');
    }
  }

  const handleDelete = async (entryID) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/deleteEntry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entry_id: entryID })
      });

      const result = await response.json();

      if (result.success) {
        updateList();
      } else {
        alert(result.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error: deleting', error);
      alert('Delete failed');
    }
  };

  const updateList = async() => {
    const updated = await fetch(`${config.apiBaseUrl}/getEntriesByNumber/${staffNumber}`);
    const updatedData = await updated.json();

    if (updatedData.success) {
      setEntries(updatedData.data);
    } else {
      alert('Request successful, error updating list');
    }
  }

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
        </div>
        <p></p>
        <EntryList
          buildings={buildings} 
          entries={entries} 
          onLeaveBuilding={handleLeave} 
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default WardenLocation;