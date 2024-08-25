import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';
import { AuthProvider } from './context/AuthContext';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #FFA20D;
    --primary-color-gradient: #FFDD00;
    --text-color: #FFF;
    --secondary-color: #FF6138;
    --focus-color: #FFA20D;
    --hover-color: #FF4500;
    --text-size: 3em;
    --title-size: 4em;
    --input-text-size: 2em;
    --border-radius: 8px;
    --font-family: 'Amatic SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font-family);
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalStyle />
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
