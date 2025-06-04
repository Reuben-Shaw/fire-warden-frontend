import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { useState } from 'react';
import WardenLocation from './pages/WardenLocation';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [staffNumber, setStaffNumber] = useState(null);

  const handleLoginSuccess = (number) => {
    setStaffNumber(number);
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/warden-location" />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/warden-location"
          element={
            isAuthenticated ? <WardenLocation staffNumber={staffNumber} /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;