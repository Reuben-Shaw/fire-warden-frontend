import { useEffect, useState } from 'react';
import './EntryPopup.css';
import '../App.css';

function UserPopup({ onEdit, onCancel, onDelete, initialFirst, initialLast }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  useEffect(() => {
    const setValues = () => {
      setFirstName(initialFirst);
      setLastName(initialLast);
    };
    setValues();
  }, [initialFirst, initialLast]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!firstName || !lastName) {
      alert('Please ensure all data is filled.');
      return;
    }

    onEdit(firstName, lastName);
    onCancel();
  };

  const handleDelete =  (event) => {
    event.preventDefault();
    onDelete();
  };

  return (
    <div className="popup-overlay">
      <form className="popup-content" onSubmit={handleSubmit}>
        <h2>Edit Details</h2>
        <label>
          First Name:
          <input
            type='text'
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type='text'
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </label>
        <div className='popup-buttons'>
          <button type='submit'>Update</button>
          <button onClick={handleDelete} className='delete'>Delete</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default UserPopup;