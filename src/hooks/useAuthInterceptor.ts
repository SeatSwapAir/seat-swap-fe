import { useEffect } from 'react';
import { AuthData } from '@/auth/AuthWrapper';
import { setAuthToken } from '@/components/ApiUrl';
import apiUrl from '@/components/ApiUrl';

export const useAuthInterceptor = () => {
  const { user, token } = AuthData();

  useEffect(() => {
    const manageAuthToken = async () => {
      console.log('useAuthInterceptor effect running');
      console.log('Current auth state:', {
        isAuthenticated: user.isAuthenticated,
        token,
      });

      // If the user is authenticated and the token exists, set it
      if (user.isAuthenticated && token) {
        console.log('Setting auth token:', token);
        setAuthToken(token);
      } else {
        // Otherwise, clear the auth token
        console.log('Clearing auth token');
        setAuthToken(null);
      }
    };

    manageAuthToken(); // Invoke the async function
  }, [user.isAuthenticated, token]);
};
