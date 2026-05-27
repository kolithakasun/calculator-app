import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './styles/global.css';
import './styles/components.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  document.body.innerHTML =
    '<p style="padding:2rem;font-family:system-ui,sans-serif">Could not find #root. Check index.html.</p>';
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
}
