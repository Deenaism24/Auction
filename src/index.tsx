// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './style.css';
import store from './store'; // Импортируем наш Redux store
import { Provider } from 'react-redux'; // Импортируем Provider из react-redux

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      {/* Оборачиваем App в Provider и передаем ему наш store */}
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}