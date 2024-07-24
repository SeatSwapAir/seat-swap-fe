import DeleteIcon from '@mui/icons-material/Delete';

import { FlightProps } from '../../lib/types';
import FlightForm from './FlightForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FlightTakeoff, FlightLand } from '@mui/icons-material';
import dayjs from 'dayjs';

export default function FlightInfo({ flight }: { flight: FlightProps }) {
  const {
    id,
    flightnumber,
    departureairport,
    arrivalairport,
    departuretime,
    arrivaltime,
    airline,
  } = flight;
  return (
    <Card className='w-fit'>
      <CardHeader className='flex flex-col space-y-1.5 p-3 pl-6 pt-4'>
        <CardTitle className='text-lg flex justify-between p-0'>
          {' '}
          {airline} - Flight {flightnumber}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col'>
        <ul className='list-none p-0 text-sm '>
          <li className='mb-2 flex items-center'>
            <FlightTakeoff />: Airport - {departureairport}, Time -{' '}
            {dayjs(departuretime).format('MMMM D, YYYY h:mm A')}
          </li>
          <li className='mb-2 flex items-center'>
            <FlightLand />: Airport - {arrivalairport}, Time -{' '}
            {dayjs(arrivaltime).format('MMMM D, YYYY h:mm A')}
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
