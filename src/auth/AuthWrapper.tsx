import React, { createContext, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import Home from '../components/Home';
import Login from '../components/Login';
import Account from '../components/Account';
import Header from '@/components/Header';
import AddJourney from '@/components/AddJourney';
import Journey from '@/components/Journey';
import { setAuthToken } from '@/components/ApiUrl';

type User = {
  name: string;
  isAuthenticated: boolean;
};

type AuthContextType = {
  user: User;
  login: () => void;
  logout: () => void;
  token: string | null;
};

const AuthContext = createContext<AuthContextType>({
  user: { name: '', isAuthenticated: false },
  login: () => {},
  logout: () => {},
  token: null,
});
export const AuthData = () => useContext(AuthContext);

const AuthWrapperContent = ({ children }: { children: React.ReactNode }) => {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();
  const [token, setToken] = useState<string | null>(null);

  const fetchToken = async () => {
    if (isAuthenticated) {
      const newToken = await getAccessTokenSilently();
      setToken(newToken);
      localStorage.setItem('authToken', newToken || '');
      setAuthToken(newToken || null);
    } else {
      setToken(null);
      localStorage.removeItem('authToken');
      setAuthToken(null);
    }
  };

  useEffect(() => {
    fetchToken();
  }, [isAuthenticated]);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    setToken(storedToken);
    setAuthToken(storedToken || null);
  }, []);

  const authUser = { name: user?.name || '', isAuthenticated: isAuthenticated };
  return (
    <AuthContext.Provider
      value={{ user: authUser, login: loginWithRedirect, logout, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  console.log('Auth0Provider initialized with', {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    audience: 'https://seat-swap-be',
    redirect_uri: window.location.origin,
  });
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://seat-swap-be',
        scope: 'openid profile email',
      }}
    >
      <AuthWrapperContent>{children}</AuthWrapperContent>
    </Auth0Provider>
  );
};
