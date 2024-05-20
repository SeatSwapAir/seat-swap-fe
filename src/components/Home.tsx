import Flights from './Flights';

const Home = ({
  handleLogin,
  isLoggedIn,
}: {
  handleLogin: () => void;
  isLoggedIn: boolean;
}) => {
  return (
    <div>
      {isLoggedIn ? (
        <>
          <div style={{ marginTop: '5vh' }}></div>
          <Flights />
        </>
      ) : (
        <>
          <h1 className='head1'>Welcome to SeatSwap!</h1>
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
};

export default Home;
