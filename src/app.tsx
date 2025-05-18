import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import LoginPopup from './popApps/login';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage showLogin={() => setShowLogin(true)} />} />
      </Routes>

      {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
    </BrowserRouter>
  );
};

export default App;