import Main from './Main';
import { AuthData } from '../auth/AuthWrapper';
import { useAuth0 } from '@auth0/auth0-react';

import { Link } from 'react-router-dom';
const Home = () => {
  const { user } = AuthData();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <div>
      {isAuthenticated ? (
        <>
          <Main />
        </>
      ) : (
        <>
          <h1 className='head1'>Welcome to SeatSwap!</h1>

          <button onClick={() => loginWithRedirect()}>Login</button>
        </>
      )}
    </div>
  );
};

export default Home;
