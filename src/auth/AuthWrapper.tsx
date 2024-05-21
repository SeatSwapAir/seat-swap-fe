import { createContext, useContext, useState } from 'react';
import Menu from '../components/Menu';
import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';

type User = {
  name: string;
  isAuthenticated: boolean;
};

type AuthContextType = {
  user: User;
  login: (userName: string, password: string) => Promise<unknown>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: { name: '', isAuthenticated: false },
  login: async () => '',
  logout: () => {},
});
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [user, setUser] = useState({ name: '', isAuthenticated: false });

  const login = (userName: string, password: string) => {
    return new Promise((resolve, reject) => {
      if (password === 'bob') {
        setUser({ name: userName, isAuthenticated: true });
        resolve('success');
      } else {
        reject('Incorrect password');
      }
    });
  };

  const logout = () => {
    setUser({ ...user, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <>
        <Menu />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<h1>SignUp</h1>} />
          <Route path='/account' element={<h1>Account</h1>} />
          <Route path='/defaultpreferences' element={<h1>Default Pref</h1>} />
          <Route path='/review' element={<h1>Review</h1>} />
          <Route path='/reviews' element={<h1>Reviews</h1>} />
        </Routes>
      </>
    </AuthContext.Provider>
  );
};
