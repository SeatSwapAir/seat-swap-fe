import MainMenu from './ui/main-menu';

const Header = () => {
  return (
    <div className=' border-b-2 border-cyan-600 h-[60px] bg-background flex flex-row justify-between items-center p-3'>
      <span className='font-bold text-xl'>SeatSwap</span>
      <MainMenu />
    </div>
  );
};

export default Header;
