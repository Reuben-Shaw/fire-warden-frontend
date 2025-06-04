import { useEffect, useState } from 'react';
import './EntryPopup.css';

function EntryPopup({ buildings, onAdd, onCancel, entryID, defaultEntry, defaultExit, defaultBuilding, sameDay }) {
  let [selectedBuilding, setSelectedBuilding] = useState('');
  let [entryTime, setEntryTime] = useState('');
  let [exitTime, setExitTime] = useState('');

  
  useEffect(() => {
    if (entryID) {
      setEntryTime(toTimeInput(defaultEntry) || '');
      setExitTime(toTimeInput(defaultExit) || '');
      setSelectedBuilding(defaultBuilding || '');
    } else {
      setEntryTime('');
      setExitTime('');
      setSelectedBuilding('');
    }
  }, [entryID, defaultEntry, defaultExit, defaultBuilding]);

  const toTimeInput = (dt) => {
    if (!dt) return '';
    const date = new Date(dt);
    const hours = date.getHours().toString().padStart(2, '0');
    const mins = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${mins}`;
  };

  const handleEntryTimeChange = (event) => {
    setEntryTime(event.target.value);
  };

  const handleExitTimeChange = (event) => {
    setExitTime(event.target.value);
  };

  const handleBuildingChange = (event) => {
    setSelectedBuilding(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!entryTime || !selectedBuilding || (entryID && !exitTime)) {
      alert("Please enter both times and a building.");
      return;
    }

    if (entryID) {
      const getDateFrom = (iso) => {
        const d = new Date(iso);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      };

      const baseDate = getDateFrom(defaultEntry);

      const toUTC = (dateStr, timeStr) => {
        const localDate = new Date(`${dateStr}T${timeStr}`);
        return localDate.toISOString();
      };

      const entryDT = toUTC(baseDate, entryTime);
      const exitDT = toUTC(baseDate, exitTime);

      if (sameDay) {
        const [entryHours, entryMinutes] = entryTime.split(':').map(Number);
        const [exitHours, exitMinutes] = exitTime.split(':').map(Number);

        const entryMins = entryHours * 60 + entryMinutes;
        const exitMins = exitHours * 60 + exitMinutes;

        if (exitMins <= entryMins) {
          alert('Please ensure that the exit time is after entry.');
          return;
        }
      }

      onAdd(entryID, selectedBuilding, entryDT, exitDT);
    } else {
      onAdd(entryTime, selectedBuilding);
    }

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
          Entry Time:
          <input
            type='time'
            value={entryTime}
            onChange={handleEntryTimeChange}
            required
          />
        </label>
        {
          entryID && (
            <label>
            Exit Time:
            <input
              type='time'
              value={exitTime}
              onChange={handleExitTimeChange}
              required
            />
          </label>)
        }
        <div className='popup-buttons'>
          <button type='submit'>{entryID ? 'Update' : 'Add'}</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EntryPopup;