import Main from './Main';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
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
