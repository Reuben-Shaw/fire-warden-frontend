import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { useState } from 'react';
import WardenLocation from './pages/WardenLocation';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/warden-location" />
            ) : (
              <Login onLoginSuccess={() => setIsAuthenticated(true)} />
            )
          }
        />
        <Route
          path="/warden-location"
          element={
            isAuthenticated ? <WardenLocation /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;