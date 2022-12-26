import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

/** Components */
import App from './App';

/** NextUI */
import { NextUIProvider } from '@nextui-org/react';

/** React Query */
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
