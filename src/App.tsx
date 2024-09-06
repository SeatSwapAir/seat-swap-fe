import { AuthWrapper } from './auth/AuthWrapper';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAuthInterceptor } from './hooks/useAuthInterceptor';
import Header from '@/components/Header';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Account from '@/components/Account';
import AddJourney from '@/components/AddJourney';
import Journey from '@/components/Journey';
import { Route, Routes } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
});
function App() {
  useAuthInterceptor();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthWrapper>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/addjourney' element={<AddJourney />} />
            <Route path='/journey' element={<Journey />} />
            <Route path='/signup' element={<h1>SignUp</h1>} />
            <Route path='/account' element={<Account />} />
            <Route path='/review' element={<h1>Review</h1>} />
            <Route path='/reviews' element={<h1>Reviews</h1>} />
          </Routes>
        </BrowserRouter>
      </AuthWrapper>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
