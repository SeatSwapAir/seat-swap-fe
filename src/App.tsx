import { BrowserRouter, Navigate } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FetchProvider } from './context/FetchContext';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Account from './components/Account';
import Header from '@/components/Header';
import AddJourney from '@/components/AddJourney';
import Journey from '@/components/Journey';
import { useAuth0, Auth0Provider } from '@auth0/auth0-react';
import { Suspense } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
});

const LoadingFallback = () => (
  <>
    <Header />
    <div className='p-4'>Loading...</div>
  </>
);

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  console.log('Is Authenticated:', isAuthenticated); // Add this line to check the auth state
  console.log('Is Loading:', isLoading); // Check if it's stuck in the loading state

  if (isLoading) {
    return <div className='h-screen flex justify-center'>Seat Swap</div>;
  }

  return (
    <>
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<h1>SignUp</h1>} />

          {/* Conditionally protect these routes */}
          {isAuthenticated ? (
            <>
              <Route path='/addjourney' element={<AddJourney />} />
              <Route path='/journey' element={<Journey />} />
              <Route path='/account' element={<Account />} />
              <Route path='/review' element={<h1>Review</h1>} />
              <Route path='/reviews' element={<h1>Reviews</h1>} />
            </>
          ) : (
            <Route path='*' element={<Navigate to='/' />} />
          )}
        </Routes>
      </Suspense>
    </>
  );
};

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

function App() {
  if (!domain || !clientId || !audience) {
    throw new Error('Missing Auth0 environment variables.');
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: `${window.location.origin}`,
          audience: audience,
        }}
      >
        <BrowserRouter>
          <FetchProvider>
            <AppRoutes />
          </FetchProvider>
        </BrowserRouter>
      </Auth0Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
