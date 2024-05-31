import './App.css';
import { AuthWrapper } from './auth/AuthWrapper';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <AuthWrapper />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
