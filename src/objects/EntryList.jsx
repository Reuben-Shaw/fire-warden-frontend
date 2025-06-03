import React from 'react';
import './EntryList.css';

const EntryList = ({ entries }) => {
    const handleUpdate = async (entryId) => {
        const registerData = {
            entry_id: entryId,
            time_now: new Date().toISOString()
        };

        try {
            const response = await fetch('http://localhost:7071/api/leaveBuilding', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });

            const result = await response.json();

            if (result.success) {
                alert('Successfully Left');
            } else {
                alert(result.message || 'Leaving Failed');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Failed to submit data');
        }
    };

    return (
        <div className="entry-list">
            {entries.map((entry) => (
                <div key={entry.id} className="entry-card">
                    <h3>{entry.building_name}</h3>
                    <p><strong>Entry:</strong> {new Date(entry.entry_datetime).toLocaleString()}</p>
                    <p><strong>Exit:</strong> {entry.exit_datetime ? new Date(entry.exit_datetime).toLocaleString() : 'Still inside'}</p>
                    <button 
                        title="Leave"
                        onClick={() => handleUpdate(entry.id)}
                        disabled={!!entry.exit_datetime}
                    >
                        {entry.exit_datetime ? 'Exited' : 'Leave Building'}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default EntryList;
