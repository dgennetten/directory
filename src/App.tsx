import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import FamilyDirectory from './components/FamilyDirectory';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user was previously authenticated (optional - for session persistence)
  useEffect(() => {
    const authStatus = sessionStorage.getItem('familyDirectoryAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('familyDirectoryAuth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('familyDirectoryAuth');
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <FamilyDirectory onLogout={handleLogout} />;
}

export default App;