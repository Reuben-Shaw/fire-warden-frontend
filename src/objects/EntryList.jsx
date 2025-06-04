import './EntryList.css';
import '../App.css';

const EntryList = ({ entries, onLeaveBuilding }) => {
  return (
    <div className="entry-list">
      {entries.map((entry) => (
        <div key={entry.id} className="entry-card">
          <div>
            {(() => {
              const formatTime = (datetime) => new Date(datetime).toLocaleString();
              const splitDate = (datetime) => formatTime(datetime).split(',');

              const hasExited = !!entry.exit_datetime;

              const entryParts = splitDate(entry.entry_datetime);
              const exitParts = hasExited ? splitDate(entry.exit_datetime) : null;

              const sameDay = hasExited && entryParts[0] === exitParts[0];

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
