import { useState } from 'react';
import './EntryList.css';
import '../App.css';
import EntryPopup from './EntryPopup';

const EntryList = ({ buildings, entries, onLeaveBuilding, onDelete, onUpdate }) => {
  const [selectedEntryForEdit, setSelectedEntryForEdit] = useState(null);

  const getDatesTime = (entry) =>{
    const formatTime = (datetime) => new Date(datetime).toLocaleString();
    const splitDate = (datetime) => formatTime(datetime).split(',');

    const hasExited = !!entry.exit_datetime;

    const entryParts = splitDate(entry.entry_datetime);
    const exitParts = hasExited ? splitDate(entry.exit_datetime) : null;

    const sameDay = hasExited && entryParts[0] === exitParts[0];

    return[formatTime, hasExited, entryParts, exitParts, sameDay]
  }

  return (
    <div className="entry-list">
      {entries.map((entry) => (
        <div key={entry.id} className="entry-card">
          <div>
            {(() => {
              const [formatTime, hasExited, entryParts, exitParts, sameDay] = getDatesTime(entry);

              return (
                <>
                  <h3>{entry.building_name}{sameDay ? ` - ${entryParts[0]}` : ''}</h3>
                  <p><strong>Entry Time:</strong> {sameDay ? entryParts[1] : formatTime(entry.entry_datetime)}</p>
                  <p><strong>Exit Time:</strong> {
                    hasExited
                      ? (sameDay ? exitParts[1] : formatTime(entry.exit_datetime))
                      : 'Still inside'
                  }</p>
                </>
              );
            })()} 
            <div className='buttons-div'>
              <button onClick={() => setSelectedEntryForEdit(entry)}>Edit</button>
              {selectedEntryForEdit?.id === entry.id && (() => {
                const [,,,,sameDay] = getDatesTime(entry);
                return (
                  <EntryPopup
                    buildings={buildings}
                    onAdd={onUpdate}
                    onCancel={() => setSelectedEntryForEdit(null)}
                    entryID={entry.id}
                    defaultEntry={entry.entry_datetime}
                    defaultExit={entry.exit_datetime}
                    defaultBuilding={entry.building_id}
                    sameDay={sameDay}
                  />
                );
              })()}
              <button className='delete' onClick={() => onDelete(entry.id)}>Delete</button>
            </div>
          </div>
          {!entry.exit_datetime && (
            <button
              title="Leave"
              onClick={() => onLeaveBuilding(entry.id)}
            >
              Leave Building
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default EntryList;
