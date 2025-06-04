import './EntryList.css';
import '../App.css';

const WardenEntryList = ({ wardenEntries }) => {

  const getDateTimeInfo = (entry) => {
    const date = new Date(entry.entry_datetime);
    const entryDate = date.toLocaleDateString();
    const entryTime = date.toLocaleTimeString();

    let exitTime = null;
    let hasExited = false;

    if (entry.exit_datetime) {
      const exit = new Date(entry.exit_datetime);
      exitTime = exit.toLocaleTimeString();
      hasExited = true;
    }

    return { entryDate, entryTime, exitTime, hasExited };
  };

  return (
    <div className="entry-list">
      {wardenEntries.map((entry) => {
        const { entryDate, entryTime, exitTime, hasExited } = getDateTimeInfo(entry);

        return (
          <div key={entry.id} className="entry-card">
            <h3>{entry.first_name} {entry.last_name} — #{entry.staff_number}</h3>
            <p><strong>Last Location:</strong> {entry.building_name || 'Unknown'}</p>
            <p><strong>Entry Date:</strong> {entryDate}</p>
            <p><strong>Entry Time:</strong> {entryTime}</p>
            <p><strong>Exit Time:</strong> {hasExited ? exitTime : 'Still inside'}</p>
          </div>
        );
      })}
    </div>
  );
};

export default WardenEntryList;