import Main from './Main';
import { AuthData } from '../auth/AuthWrapper';
import { Link } from 'react-router-dom';
const Home = () => {
  const { user } = AuthData();
  return (
    <div>
      {user.isAuthenticated ? (
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
