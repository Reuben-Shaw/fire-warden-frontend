import { useEffect, useState } from 'react';
import EntryList from '../objects/EntryList';
import Header from '../objects/Header';

function WardenLocation() {
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState(null);

    const staffNumber = 555;

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const res = await fetch(
                    `http://localhost:7071/api/getEntriesByNumber/${staffNumber}`
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

        fetchEntries();
    }, [staffNumber]);

    return (
        <div>
            <Header/>
            <div>
                <h1>Building Entry Logs</h1>
                
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p></p>
            <EntryList entries={entries} />
        </div>
    );
}

export default WardenLocation;