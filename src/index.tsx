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

// import { createRoot } from 'react-dom/client';
// import React from 'react';
// import './style.css';
// import App from './app';
//
// const rootHtmlElement = document.getElementById('root');
// if (rootHtmlElement) {
//     console.log('Запуск react');
//     const root = createRoot(rootHtmlElement);
//     root.render(<App />);
// }

// import { initCarusel } from './components/carusel'
//
// const container = document.querySelector<HTMLElement>('.nft-card-container')
// const btnLeft = document.querySelector<HTMLButtonElement>('.top-nft .btn-left')
// const btnRight = document.querySelector<HTMLButtonElement>('.top-nft .btn-right')
// if (container && btnLeft && btnRight) {
//     initCarusel(container, btnLeft, btnRight)
// }
