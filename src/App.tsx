import './App.css';
import { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Menu from './components/Menu';
import Home from './components/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Menu loggedInStatus={isLoggedIn} handleLogout={handleLogout}></Menu>
      <Routes>
        <Route
          path='/'
          element={<Home handleLogin={handleLogin} isLoggedIn={isLoggedIn} />}
        />
        <Route path='/login' element={<h1>Home</h1>} />
        <Route path='/signup' element={<h1>Home</h1>} />
        <Route path='/account' element={<h1>Account</h1>} />
        <Route path='/defaultpreferences' element={<h1>Default Pref</h1>} />
        <Route path='/review' element={<h1>Home</h1>} />
        <Route path='/reviews' element={<h1>Reviews</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
