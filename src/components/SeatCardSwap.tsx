import { SeatProps } from '../../lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const SeatCardSwap = ({ seat }: { seat: SeatProps }) => {
  return (
    <CardContent className='p-0'>
      <ul className='flex flex-row list-none p-0 text-sm items-center'>
        <li className='text-lg ml-2'>
          {' '}
          {seat.seat_row}
          {seat.seat_letter}
        </li>
        <li className=' flex items-center p-0'>
          <>
            {seat.location === 'front' ? (
              <img
                src={'../../public/front2.svg'}
                alt=''
                className='w-4 h-4 mr-2 '
              />
            ) : seat.location === 'center' ? (
              <img
                src={'../../public/center2.svg'}
                alt=''
                className='w-4 h-4 mr-2 '
              />
            ) : (
              <img
                src={'../../public/back2.svg'}
                alt=''
                className='w-4 h-4 mr-2 '
              />
            )}
          </>
        </li>
        <li className=' flex items-center p-0'>
          {seat.position === 'aisle' ? (
            <>
              <img
                src={'../../public/Aircraft_Seat_Aisle.svg'}
                className='w-4 h-4 mr-2'
              />
            </>
          ) : seat.position === 'middle' ? (
            <>
              <img
                src={'../../public/Aircraft_Seat_Middle.svg'}
                className='w-4 h-4 mr-2'
              />
            </>
          ) : (
            <>
              <img
                src={'../../public/Aircraft_Seat_Window.svg'}
                className='w-4 h-4 mr-2'
              />
            </>
          )}
        </li>
        <li className='flex items-center p-0'>
          {seat.extraLegroom ? (
            <img
              src={'../../public/Airline_Seat_Extra_Legroom.svg'}
              className='w-4 h-4 mr-2'
            />
          ) : (
            <img
              src={'../../public/Airline_Seat_Reduced_Legroom.svg'}
              className='w-4 h-4 mr-2'
            />
          )}
        </li>
      </ul>
    </CardContent>
  );
};

export default SeatCardSwap;
