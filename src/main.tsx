import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { useAuthStore } from './store/auth';

useAuthStore.getState().init();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
