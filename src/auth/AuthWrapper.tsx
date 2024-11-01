import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Home from '../components/Home';
import Login from '../components/Login';
import Account from '../components/Account';
import Header from '@/components/Header';
import AddJourney from '@/components/AddJourney';
import Journey from '@/components/Journey';

export const AuthWrapper = () => {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    console.log(
      '🚀 ~ file: AuthWrapper.tsx:18 ~ useEffect ~ isLoading:',
      isLoading
    );
    if (isLoading) {
      return;
    }
    // if (!isAuthenticated && !isLoading) {return <div>Loading...</div>};
    const setAuthToken = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://seatswap.api`,
          },
        });
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('🚀 ~', axios.defaults.headers.common['Authorization']);
      } catch (error) {
        console.error('!!!Error fetching access token', error);
      }
    };

    setAuthToken();
  }, [getAccessTokenSilently, isAuthenticated, isLoading]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <Home token={axios.defaults.headers.common['Authorization']} />
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/addjourney' element={<AddJourney />} />
        <Route path='/journey' element={<Journey />} />
        <Route path='/signup' element={<h1>SignUp</h1>} />
        <Route path='/account' element={<Account />} />
        <Route path='/review' element={<h1>Review</h1>} />
        <Route path='/reviews' element={<h1>Reviews</h1>} />
      </Routes>
    </>
  );
};
