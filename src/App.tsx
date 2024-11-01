import { AuthWrapper } from './auth/AuthWrapper';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Auth0Provider } from '@auth0/auth0-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
});
function App() {
  return (
    <Auth0Provider
      domain='mzhoffman.uk.auth0.com'
      clientId='JZanN9yTiIPHOieFQIl4cbcZdZ4zRHts'
      useRefreshTokens
      cacheLocation='localstorage'
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://seatswap.api',
        scope: 'openid profile email offline_access',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthWrapper />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Auth0Provider>
  );
}
export default App;
