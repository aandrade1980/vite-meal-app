import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

/** Components */
import App from './App';

/** NextUI */
import { NextUIProvider } from '@nextui-org/react';

/** React Query */
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

/** Context */
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <NextUIProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
