import FlightInfo from './FlightInfo';

import { useFlightsByUserId } from '../hooks/queries';

import { Separator } from '@/components/ui/separator';
import { CardDescription, CardHeader, CardTitle } from './ui/card';

import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

export default function Flights2() {
  const FlightsByUserIdQuery = useFlightsByUserId(21);
  console.log(
    '🚀 ~ Flights2 ~ FlightsByUserIdQuery:',
    FlightsByUserIdQuery.data
  );
  const navigate = useNavigate();

  const handleNavigate = (flight_id: string) => {
    navigate('/journey', { state: { user_id: 21, flight_id: flight_id } });
  };

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
              <Button onClick={() => handleNavigate(flight.id)}>
                Manage Journey
              </Button>
              <Separator className='my-2' />
            </>
          ))}
      </div>
    </>
  );
}
