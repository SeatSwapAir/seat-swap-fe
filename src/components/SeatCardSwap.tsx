import { SeatProps } from '../../lib/types';

import AircraftSeatAisle from '@/components/ui/icons/AircraftSeatAisle';
import AircraftSeatMiddle from '@/components/ui/icons/AircraftSeatMiddle';
import AircraftSeatWindow from '@/components/ui/icons/AircraftSeatWindow';
import AircraftSeatExtraLegroom from '@/components/ui/icons/AircraftSeatExtraLegroom';
import AircraftSeatReducedLegroom from '@/components/ui/icons/AircraftSeatReducedLegroom';
import AircraftFrontSection from '@/components/ui/icons/AircraftFrontSection';
import AircraftCenterSection from '@/components/ui/icons/AircraftCenterSection';
import AircraftBackSection from '@/components/ui/icons/AircraftBackSection';

const SeatCardSwap = ({ seat }: { seat: SeatProps }) => {
  return (
    <div className='p-0'>
      <ul className='flex flex-row list-none p-0 items-center'>
        <li className='text-lg ml-2 mr-2'>
          {/* <span className='hidden lg:inline-block mr-1'>Seat </span> */}

          {seat.seat_row}
          {seat.seat_letter}
        </li>
        <li className=' flex items-center  p-1 border-2 rounded-md mr-2'>
          {seat.location === 'front' ? (
            <AircraftFrontSection className='w-6 h-6' />
          ) : seat.location === 'center' ? (
            <AircraftCenterSection className='w-6 h-6  ' />
          ) : (
            <AircraftBackSection className='w-6 h-6  ' />
          )}
        </li>
        <li className=' flex items-center  p-1 border-2 rounded-md mr-2'>
          {seat.position === 'aisle' ? (
            <AircraftSeatAisle className='w-6 h-6 ' />
          ) : seat.position === 'middle' ? (
            <AircraftSeatMiddle className='w-6 h-6 ' />
          ) : (
            <AircraftSeatWindow className='w-6 h-6 ' />
          )}
        </li>
        <li className='flex items-center  p-1 border-2 rounded-md mr-2'>
          {seat.extraLegroom ? (
            <AircraftSeatExtraLegroom className='w-6 h-6 ' />
          ) : (
            <AircraftSeatReducedLegroom className='w-6 h-6 ' />
          )}
        </li>
      </ul>
    </div>
  );
};

export default SeatCardSwap;
