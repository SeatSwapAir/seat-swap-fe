import { Typography } from '@mui/material';

import { SeatProps } from '../../lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AirlineSeatLegroomExtraIcon from '@mui/icons-material/AirlineSeatLegroomExtra';
import AirlineSeatLegroomReducedIcon from '@mui/icons-material/AirlineSeatLegroomReduced';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

export default function Seat({ seat }: { seat: SeatProps }) {
  return (
    <>
      <Card className='w-fit'>
        <CardHeader className='flex flex-col space-y-1.5 p-3 pl-6 pt-4'>
          <CardTitle className='text-base flex justify-between p-0'>
            {' '}
            Seat {seat.seat_row}
            {seat.seat_letter}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='list-none p-0 text-sm '>
            <li className='mb-2 flex items-center'>
              <>
                <AirplanemodeActiveIcon className='mr-2' />
                {seat.location === 'front'
                  ? ' Front Seat'
                  : seat.location === 'center'
                  ? ' Center Seat'
                  : ' Rear Seat'}
              </>
            </li>
            <li className='mb-2 flex items-center'>
              {seat.position === 'aisle' ? (
                <>
                  <img
                    src={'../../public/Aircraft_Seat_Aisle.svg'}
                    className='w-6 h-6 mr-2'
                  />
                  Aisle Seat
                </>
              ) : seat.position === 'middle' ? (
                <>
                  <img
                    src={'../../public/Aircraft_Seat_Middle.svg'}
                    className='w-6 h-6 mr-2'
                  />
                  Middle Seat
                </>
              ) : (
                <>
                  <img
                    src={'../../public/Aircraft_Seat_Window.svg'}
                    className='w-6 h-6 mr-2'
                  />
                  Window Seat
                </>
              )}
            </li>
            <li className='flex items-center'>
              {seat.extraLegroom ? (
                <>
                  <AirlineSeatLegroomExtraIcon className='mr-2' /> Extra Legroom
                </>
              ) : (
                <>
                  <AirlineSeatLegroomReducedIcon className='mr-2' /> Usual
                  Legroom
                </>
              )}
            </li>
            <li className='flex items-center mt-1'>
              {seat.previous_user_name && (
                <div>Previous owner: {seat.previous_user_name}</div>
              )}
            </li>
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
