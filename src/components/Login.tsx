import { useState } from 'react';
// import { AuthData } from '../auth/AuthWrapper';
import { useNavigate } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('bob');
  const [password, setPassword] = useState('bob');
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <>
      <div className='page'>
        <h2>Login page</h2>
        <div className='inputs'>
          <div className='input'>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type='text'
            />
          </div>
          <div className='input'>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
            />
          </div>
          <div className='button'>
            {/* <button onClick={doLogin}>Log in</button> */}
          </div>
        </div>
      </div>
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </button>
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </>
  );
};
export default Login;
