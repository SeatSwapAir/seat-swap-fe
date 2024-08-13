import FlightInfo from './FlightInfo';

import { useFlightsByUserId } from '../hooks/queries';

import { Separator } from '@/components/ui/separator';
import { CardDescription, CardHeader, CardTitle } from './ui/card';

export default function Flights2() {
  const FlightsByUserIdQuery = useFlightsByUserId(21);
  console.log(
    '🚀 ~ Flights2 ~ FlightsByUserIdQuery:',
    FlightsByUserIdQuery.data
  );
  return (
    <>
      <div className='grid-flow-row max-w-[450px]'>
        <CardHeader>
          <CardTitle>Or manage Your Journeys!</CardTitle>
          <CardDescription>Just click to manage</CardDescription>
        </CardHeader>
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
