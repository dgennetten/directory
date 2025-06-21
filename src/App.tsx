import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import FamilyDirectory from './components/FamilyDirectory';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user was previously authenticated (for session persistence and remembered devices)
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('familyDirectoryAuth');
    const rememberedDevice = localStorage.getItem('familyDirectoryRemembered');
    
    if (sessionAuth === 'true' || rememberedDevice === 'true') {
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
    localStorage.removeItem('familyDirectoryRemembered');
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <FamilyDirectory onLogout={handleLogout} />;
}

export default App;