import { useState } from 'react';
import './EntryPopup.css';
import config from '../config'

function EntryPopup({ buildings, staffNumber, onCancel }) {
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [time, setTime] = useState('');

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleBuildingChange = (event) => {
    setSelectedBuilding(event.target.value);
  };

  const handleAdd = async (event) => {
    if (!selectedBuilding || !time) {
      alert('Please select a building');
      return;
    }
    event.preventDefault();

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
        alert('Successfully registered with the system')
      } else {
        alert(result.message || 'Registering failed');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Add Entry</h2>
        <label>
          Building:
          <select
            value={selectedBuilding}
            onChange={handleBuildingChange}
          >
            <option value="">-- Select Building --</option>
            {buildings.map((b) => (
              <option key={b.id} value={b.id}>{b.building_name}</option>
            ))}
          </select>
        </label>
        <label>
          Time:
          <input
            type="time"
            value={time}
            onChange={handleTimeChange}
            required
          />
        </label>
        <div className="popup-buttons">
          <button onClick={handleAdd}>Add</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EntryPopup;