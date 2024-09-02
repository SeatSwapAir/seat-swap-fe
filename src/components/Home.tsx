import Main from './Main';
import { AuthData } from '../auth/AuthWrapper';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const { user } = AuthData();
  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <button onClick={() => loginWithRedirect()}>Log in</button>;
  };

  const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log out
      </button>
    );
  };
  return (
    <div>
      {user.isAuthenticated ? (
        <>
          <Main />
          <LogoutButton />
        </>
      ) : (
        <>
          <h1 className='head1'>Welcome to SeatSwap!</h1>

          <LoginButton />
        </>
      )}
    </div>
  );
};

export default Home;
