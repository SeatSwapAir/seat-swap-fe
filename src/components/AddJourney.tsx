import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

import { useLocation } from 'react-router-dom';

import { FlightProps } from '../../lib/types';

import { usePostJourney } from '@/hooks/mutations';
import axios from 'axios';
import FlightInfo from './FlightInfo';
import { Separator } from '@/components/ui/separator';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useNavigate } from 'react-router-dom';

export default function AddJourney() {
  const location = useLocation();
  const flight = location.state?.flight as FlightProps;

  if (!flight) {
    return <div>No flight details available</div>;
  }

  const [seatError, setSeatError] = useState<string | null>(null);

  const navigate = useNavigate();

  const mutateAddJourney = usePostJourney();

  const handleAddJourney = (): void | FlightProps => {
    if (!flight) return;

    const journey = {
      flightnumber: flight.flightnumber,
      departureairport: flight.departureairport,
      departureairportname: flight.departureairportname,
      arrivalairportname: flight.arrivalairportname,
      arrivalairport: flight.arrivalairport,
      departuretime: flight.departuretime,
      arrivaltime: flight.arrivaltime,
      airline: flight.airline,
      seats: [],
      id: flight.id,
    };

    mutateAddJourney.mutate({
      body: journey,
      params: { user_id: 21, flight_id: Number(flight.id) },
    });
  };

  const handleCancelJourney = () => {
    navigate('/');
  };

  useEffect(() => {
    if (mutateAddJourney.isSuccess) {
      navigate('/journey', { state: { user_id: 21, flight_id: flight.id } });
    }
  }, [mutateAddJourney.isSuccess]);

  useEffect(() => {
    if (mutateAddJourney.isError) {
      if (axios.isAxiosError(mutateAddJourney.error)) {
        setSeatError(
          mutateAddJourney.error.response?.data?.msg || 'An error occurred'
        );
      }
    }
  }, [mutateAddJourney.isError]);

  return (
    <div className='grid-flow-row'>
      <div className='grid justify-items-center'>
        <h3 className='text-3xl py-6'>Add seats and submit!</h3>
        <div className='grid lg:flex lg:flex-row lg:w-[1000px] justify-center'>
          <div className='min-w-[45%]'>
            <CardHeader className='mt-4'>
              <CardTitle>Heres your flight!</CardTitle>
              <CardDescription>
                Submit your journey after adding all seats
              </CardDescription>
            </CardHeader>
            {flight && <FlightInfo flight={flight} />}
            <Separator orientation='horizontal' />
            {seatError && <div>{seatError}</div>}
            <Button className='my-4' onClick={() => handleAddJourney()}>
              Confirm your journey!
            </Button>{' '}
            <Button
              className='my-4'
              variant='outline'
              onClick={() => handleCancelJourney()}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
