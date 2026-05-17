import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, defaultTheme } from '@sparrowengg/twigs-react';
import App from './App.jsx';
import './styles/global.css';

const customTheme = {
  ...defaultTheme,
  fonts: {
    ...defaultTheme.fonts,
    body: "'DM Sans', sans-serif",
    heading: "'DM Sans', sans-serif",
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
