import './App.css';
import { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Flights from './components/Flights';
import Menu from './components/Menu';

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
      <div>
        {isLoggedIn ? (
          <>
            <div style={{ marginTop: '5vh' }}></div>
            <Flights />
          </>
        ) : (
          <>
            <h1 className='head1'>Welcome to SeatSwap!</h1>
            <button onClick={handleLogin}>Login</button>
          </>
        )}
      </div>
      <Menu loggedInStatus={isLoggedIn} handleLogout={handleLogout}></Menu>
      <Routes>
        <Route path='/' element={<h1>a</h1>} />
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
