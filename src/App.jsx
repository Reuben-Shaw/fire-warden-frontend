import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { useState } from 'react';
import WardenLocation from './pages/WardenLocation';
import ViewWardens from './pages/ViewWardens';

function App() {
  // React hooks used for navigation
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [staffNumber, setStaffNumber] = useState(null);
  const [isWarden, setIsWarden] = useState(false);

  // Authenticates and sets the manager for navigation to the right page
  const handleLoginSuccess = (number, isWarden) => {
    setStaffNumber(number);
    setIsAuthenticated(true);
    setIsWarden(isWarden);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && !isWarden ? (
              <Navigate to="/view-wardens" />
            ) : (
              isAuthenticated && isWarden ? (
                <Navigate to="/warden-location" />
              ) : (
                // Default page without any authentication
                <Login onLoginSuccess={handleLoginSuccess} />
              )
            )
          }
        />
        <Route
          path="/warden-location"
          // <Navigate to="/" sets the location back to the login page, as it's the route directory
          element={
            isAuthenticated && isWarden ? <WardenLocation staffNumber={staffNumber} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/view-wardens"
          element={
            isAuthenticated && !isWarden ? <ViewWardens /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;