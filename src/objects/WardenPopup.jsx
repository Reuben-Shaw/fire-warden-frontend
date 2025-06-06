import { useState } from 'react';
import './EntryPopup.css';
import config from '../config'

function EntryPopup({ onAdd, onCancel }) {
  const [staffNumber, setNumber] = useState('');

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleCheckNumber = async (staffNumber) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/checkStaffNumberExists?staff_number=${staffNumber}`);
      const result = await response.json();

      if (result.success) {
        if (result.available) {
          return true;
        } else {
          alert(result.message || 'Staff number already exits');
        }
      } else {
        alert(result.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error: adding warden', error);
      alert('Error adding warden');
    }
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!staffNumber || isNaN(staffNumber)) {
      alert('Please enter a valid staff number.');
      return;
    }

    if (await handleCheckNumber(staffNumber)) {
      onAdd(staffNumber);
      onCancel();
    }
  };

  return (
    <div className="popup-overlay">
      <form className="popup-content" onSubmit={handleSubmit}>
        <h2>Add Warden</h2>
        <label>
          Staff Number:
          <input
            type='text'
            value={staffNumber}
            onChange={handleNumberChange}
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