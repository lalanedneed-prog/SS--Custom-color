import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, defaultTheme } from '@sparrowengg/twigs-react';
import App from './App.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
