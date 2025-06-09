import { useEffect, useState } from 'react';
import './Header.css';
import '../App.css';
import UserPopup from './UserPopup';
import config from '../config'

function Header({ first_name, last_name, staffNumber, isWarden }) {
  const [showPopup, setShowPopup] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const fetchEntries = () => {
      setFirstName(first_name);
      setLastName(last_name);
    };

    fetchEntries();
  }, [first_name, last_name]);

  const handleEdit = async (newFirst, newLast) => {
    const editData = {
      staff_number: staffNumber,
      first_name: newFirst,
      last_name: newLast,
      is_warden: isWarden
    };

    setFirstName(newFirst);
    setLastName(newLast);

    try {
      const response = await fetch(`${config.apiBaseUrl}/editUserDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editData)
      });

      const result = await response.json();

      if (result.success) {
          alert(result.message || 'Updated details successfully');
      } else {
        alert(result.message || 'Failed to update details');
      }
    } catch (error) {
      console.error('Error updating details:', error);
      alert('Failed to update details');
    }
  };

  const handleDelete = async () => {
    try {
      const deleteData = {
        staff_number: staffNumber,
        is_warden: isWarden
      };
      
      const response = await fetch(`${config.apiBaseUrl}/deleteUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(deleteData)
      });

      const result = await response.json();

      if (result.success) {
          alert(result.message || 'Deleted successfully');
          window.location.href = '/'; 
      } else {
        alert(result.message || 'Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting details:', error);
      alert('Failed to delete');
    }
  };


  return (
    <header className="header">
      <img
        src="/images/logo-white.svg"
        alt="Welcome illustration"
        className="header-logo"
      />
      <nav className="header-nav">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setShowPopup(true)
          }}
        >Manage Details</a>
        <a href="/">Logout</a>
      </nav>
      {showPopup && (
        <UserPopup
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCancel={() => setShowPopup(false)}
          initialFirst={firstName}
          initialLast={lastName}
        />
      )}
    </header>
  );
}

export default Header;