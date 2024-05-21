import { useState } from 'react';
import { AuthData } from '../auth/AuthWrapper';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { login } = AuthData();
  const [userName, setUserName] = useState('bob');
  const [password, setPassword] = useState('bob');

  const doLogin = async () => {
    try {
      await login(userName, password);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
          <button onClick={doLogin}>Log in</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
