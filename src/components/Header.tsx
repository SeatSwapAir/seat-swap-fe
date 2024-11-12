import { Link } from 'react-router-dom';
import SeedPrompt from './SeedPrompt';
import MainMenu from './ui/main-menu';

const Header = () => {
  return (
    <>
      <div className=' border-b-2 border-cyan-600 h-[60px] bg-background flex flex-row justify-between items-center p-3'>
        <Link to={`/`} style={{ color: 'inherit', textDecoration: 'none' }}>
          <span className='font-bold text-xl'>SeatSwap</span>
        </Link>
        <MainMenu />
      </div>
      <SeedPrompt />
    </>
  );
};

export default Header;
