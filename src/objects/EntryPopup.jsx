import { useState } from 'react';
import './EntryPopup.css';

function EntryPopup({ buildings, onAdd, onCancel }) {
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [time, setTime] = useState('');

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleBuildingChange = (event) => {
    setSelectedBuilding(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!time || !selectedBuilding) {
      alert("Please enter both a time and a building.");
      return;
    }
    onAdd(time, selectedBuilding);
    onCancel();
  };

  return (
    <div className="popup-overlay">
      <form className="popup-content" onSubmit={handleSubmit}>
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
            type='time'
            value={time}
            onChange={handleTimeChange}
            required
          />
        </label>
        <div className='popup-buttons'>
          <button type='submit'>Add</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EntryPopup;