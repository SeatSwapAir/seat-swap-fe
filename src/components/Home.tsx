import Main from './Main';
import { Button } from './ui/button';
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

          <Button
            variant='default'
            className='mt-4'
            onClick={() => loginWithRedirect()}
          >
            Login
          </Button>
        </>
      )}
    </div>
  );
};

export default Home;
