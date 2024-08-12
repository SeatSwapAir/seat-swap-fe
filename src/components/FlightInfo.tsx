import { FlightDetailsProps, FlightProps } from '../../lib/types';
import { Flight, FlightTakeoff } from '@mui/icons-material';
import Timeline from '@/components/ui/icons/Timeline';
import dayjs from 'dayjs';

export default function FlightInfo({
  flightDetails,
}: {
  flightDetails: FlightDetailsProps;
}) {
  return (
    <>
      <div className='w-fit grid'>
        <h3 className='mb-3 text-sm justify-self-start'>
          <Flight className='mr-2' />
          {flightDetails?.airline} Flight Number {flightDetails?.flightnumber}
        </h3>
        <div className='grid grid-flow-col justify-center'>
          <Timeline className='self-center h-14' />
          <div className='grid grid-rows-2 gap-5'>
            <div className='flex flex-row justify-center'>
              <div className='mr-5'>
                {dayjs(flightDetails?.departuretime).format('HH:mm')}
              </div>
              <div>
                {flightDetails?.departureairport}{' '}
                {flightDetails?.departureairportname}
              </div>
            </div>
            <div className='grid grid-flow-col justify-self-start'>
              <div className='mr-5'>
                {dayjs(flightDetails?.arrivaltime).format('HH:mm')}
              </div>
              <div>
                {flightDetails?.arrivalairport}{' '}
                {flightDetails?.arrivalairportname}
              </div>
            </div>
          </div>
        </div>
        <div className='mt-3 mb-3 text-sm justify-self-start'>
          <FlightTakeoff className='mr-2' />
          <span className='text-sm font-bold'>Departs: </span>
          {dayjs(flightDetails?.departuretime).format('dddd MMMM DD YYYY')}
        </div>
      </div>
    </>
  );
}
