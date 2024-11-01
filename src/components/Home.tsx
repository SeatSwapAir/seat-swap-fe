import Main from './Main';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const Home = (token: string | undefined) => {
  const { isAuthenticated, isLoading } = useAuth0();
  console.log(
    '🚀 ~ file: Home.tsx:7 ~ Home ~ isAuthenticated:',
    isAuthenticated
  );

  console.log(
    '🚀 ~ file: queries.ts:24 token',
    axios.defaults.headers.common.Authorization
  );

  return (
    <div>
      {axios.defaults.headers.common.Authorization !== undefined ? (
        <>
          <Main />
        </>
      ) : (
        <>
          <h1 className='head1'>Welcome to SeatSwap!</h1>
          <Link to={'login'}>
            <button>Login</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
