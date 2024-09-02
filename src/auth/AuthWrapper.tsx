import { createContext, useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import Home from '../components/Home';
import Login from '../components/Login';
import Account from '../components/Account';
import Header from '@/components/Header';
import AddJourney from '@/components/AddJourney';
import Journey from '@/components/Journey';

type User = {
  name: string;
  isAuthenticated: boolean;
};

type AuthContextType = {
  user: User;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: { name: '', isAuthenticated: false },
  login: () => {},
  logout: () => {},
});
export const AuthData = () => useContext(AuthContext);

const AuthWrapperContent = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const authUser = { name: user?.name || '', isAuthenticated: isAuthenticated };

  return (
    <AuthContext.Provider
      value={{ user: authUser, login: loginWithRedirect, logout }}
    >
      <>
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
      </>
    </AuthContext.Provider>
  );
};

export const AuthWrapper = () => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <AuthWrapperContent />
    </Auth0Provider>
  );
};
