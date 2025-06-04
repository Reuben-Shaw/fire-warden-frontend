import { useEffect, useState } from 'react';
import WardenEntryList from '../objects/WardenEntryList';
import Header from '../objects/Header';
import '../App.css';
import config from '../config'

function ViewWarden() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchWardens = async () => {
      try {
        const res = await fetch(
          `${config.apiBaseUrl}/getWardensLastLoc`
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
    }
    fetchWardens();
  },[]);

  return (
    <div>
      <Header />
      <div className='warden-location-page'>
        
        <WardenEntryList
          wardenEntries={entries} 
        />
      </div>
    </div>
  );
}

export default ViewWarden;