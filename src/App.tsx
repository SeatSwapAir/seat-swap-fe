import './App.css';
import { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Outlet,
  Route,
  useNavigate,
} from 'react-router-dom';

import Menu from './components/Menu';
import Home from './components/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    const navigate = useNavigate();
    event.preventDefault();
    navigate('/');
    setIsLoggedIn(false);
  };

  const AppLayout = () => (
    <>
      <Menu loggedInStatus={isLoggedIn} handleLogout={handleLogout} />
      <Outlet />
    </>
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<AppLayout />}>
        <Route
          index
          element={<Home handleLogin={handleLogin} isLoggedIn={isLoggedIn} />}
        />
        <Route path='/login' element={<h1>Home</h1>} />
        <Route path='/signup' element={<h1>Home</h1>} />
        <Route path='/account' element={<h1>Account</h1>} />
        <Route path='/defaultpreferences' element={<h1>Default Pref</h1>} />
        <Route path='/review' element={<h1>Home</h1>} />
        <Route path='/reviews' element={<h1>Reviews</h1>} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
