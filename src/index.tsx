import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './style.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  // Создаем корень React
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
