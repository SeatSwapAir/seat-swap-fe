import './App.css';
import { AuthWrapper } from './auth/AuthWrapper';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

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
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthWrapper />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
