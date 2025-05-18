import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import { routes } from './routes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        {/*<Route path={routes.create} element={<CreatePage />} />*/}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
