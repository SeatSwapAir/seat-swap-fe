import React from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from 'react-query';

const App = () => {
  const { loginWithRedirect, logout, user, getAccessTokenSilently } =
    useAuth0();

  const { data, isLoading, isError, error } = useQuery('flights', async () => {
    const token = await getAccessTokenSilently();
    const response = await axios.get(
      `http://localhost:9090/api/users/${user.sub}/flights`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {!user ? (
        <button onClick={loginWithRedirect}>Log In</button>
      ) : (
        <>
          <button onClick={logout}>Log Out</button>
          <h2>Flights for User {user.sub}:</h2>
          <ul>
            {data.map((flight) => (
              <li key={flight.id}>
                {flight.origin} to {flight.destination} on {flight.date}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
