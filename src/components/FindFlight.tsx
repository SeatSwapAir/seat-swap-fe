import { useEffect, useState } from 'react';

import { Typography } from '@mui/material';

import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker2 } from './DatePicker';

import dayjs, { Dayjs } from 'dayjs';

import { FlightProps } from '../../lib/types';
import { useFlightDetails } from '../hooks/queries';
import { useNavigate } from 'react-router-dom';

export default function FindFlight({
  flights,
}: {
  flights: FlightProps[] | null;
}) {
  const [flightNumberAndCarrierCode, setFlightNumberAndCarrierCode] =
    useState('FR2715');
  const [departureDate, setDepartureDate] = useState<Dayjs | null>(dayjs());
  const [flightDetails, setFlightDetails] = useState<FlightProps | null>(null);
  const [doesJourneyExists, setDoesJourneyExists] = useState<boolean | null>(
    null
  );
  const navigate = useNavigate();

  const findFlightDetails = () => {
    if (!flights || !departureDate) return;
    const existingJourneys = flights.filter((journey: FlightProps) => {
      const flightNumberMatch =
        journey.flightnumber === flightNumberAndCarrierCode;
      const departureDateMatch =
        dayjs(journey.departuretime).format('YYYY-MM-DD') ===
        departureDate?.format('YYYY-MM-DD');
      return flightNumberMatch && departureDateMatch;
    });
    if (existingJourneys.length > 0) {
      setFlightDetails(existingJourneys[0]);
      setDoesJourneyExists(true);
      return;
    }
    FlightDetailsQuery.refetch(); //Should I add qury key to refetch only 'getFlightDetails' not 'getFlightsByUser'?

    setDoesJourneyExists(false);
  };

  if (!departureDate) return;

  const scheduledDepartureDate = departureDate?.format('YYYY-MM-DD');

  const FlightDetailsQuery = useFlightDetails(
    flightNumberAndCarrierCode,
    scheduledDepartureDate
  );

  const handleDateChange = (date: Date) => {
    setDepartureDate(dayjs(date));
  };

  useEffect(() => {
    if (FlightDetailsQuery.isSuccess && FlightDetailsQuery.data) {
      setFlightDetails(FlightDetailsQuery.data);
      navigate('/addjourney', { state: { flight: FlightDetailsQuery.data } });
    }
    // navigate('/addjourney', { state: { flight: flightDetails } })
  }, [FlightDetailsQuery.isSuccess, FlightDetailsQuery.data]);

  return (
    <>
      {!flightDetails && (
        <div className='grid max-w-[450px]'>
          <CardHeader>
            <CardTitle>Find Your Journey!</CardTitle>
            <CardDescription>Adventure is calling!</CardDescription>
          </CardHeader>
          <div>
            For demo purposes, please enter flight FR2715, date: September 29
            2025
          </div>
          <div className='pb-6 grid'>
            <Label className='justify-self-start pb-3' htmlFor='Flight Number'>
              Flight Number
            </Label>
            <Input
              id='Flight Number'
              value={flightNumberAndCarrierCode}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFlightNumberAndCarrierCode(event.target.value);
              }}
            />
          </div>
          <div className='pb-6 grid'>
            <Label className='justify-self-start pb-3' htmlFor='Date'>
              Date
            </Label>
            <DatePicker2 handleDateChange={handleDateChange} />
          </div>
          <Button className='mb-4' onClick={() => findFlightDetails()}>
            Add Journey!
          </Button>
        </div>
      )}
      {flightDetails !== null && (
        <>
          <Typography>
            {doesJourneyExists && ' This flight has already been added'}
          </Typography>
        </>
      )}
    </>
  );
}
