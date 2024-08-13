import FlightInfo from './FlightInfo';

import { useFlightsByUserId } from '../hooks/queries';

import { Separator } from '@/components/ui/separator';

export default function Flights2() {
  const FlightsByUserIdQuery = useFlightsByUserId(21);
  console.log(
    '🚀 ~ Flights2 ~ FlightsByUserIdQuery:',
    FlightsByUserIdQuery.data
  );
  return (
    <>
      <div className='grid-flow-row'>
        {FlightsByUserIdQuery.isSuccess &&
          FlightsByUserIdQuery.data?.map((flight) => (
            <>
              <FlightInfo key={flight.id} flight={flight} />
              <Separator className='my-2' />
            </>
          ))}
      </div>
    </>
  );
}
