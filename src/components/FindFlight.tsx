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
import AddJourney from './AddJourney';

export default function FindFlight({
  flights,
}: {
  flights: FlightProps[] | null;
}) {
  const [flightNumberAndCarrierCode, setFlightNumberAndCarrierCode] =
    useState('FR9336');
  const [departureDate, setDepartureDate] = useState<Dayjs | null>(dayjs());

  const [flightDetails, setFlightDetails] = useState<FlightProps | null>(null);

  const [doesJourneyExists, setDoesJourneyExists] = useState<boolean | null>(
    null
  );

  console.log(flightNumberAndCarrierCode);
  console.log(departureDate);

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
    console.log('🚀 ~ existingJourneys ~ existingJourneys:', existingJourneys);
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
    }
  }, [FlightDetailsQuery.isSuccess, FlightDetailsQuery.data]);

  console.log('LOCAL', flightDetails);
  console.log('🚀 ~ SERVER:', FlightDetailsQuery.data);
  console.log('🚀 ~ flightDetails:', flightDetails);

  return (
    <>
      {!flightDetails && (
        <div className='grid'>
          <CardHeader>
            <CardTitle>Find Your Flight</CardTitle>
            <CardDescription>Adventure is calling!</CardDescription>
          </CardHeader>
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
          {/* <TextField
            InputLabelProps={{ shrink: true }}
            id='outlined-controlled'
            label='Flight Number'
            value={flightNumberAndCarrierCode}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFlightNumberAndCarrierCode(event.target.value);
            }}
          /> */}
          <div className='pb-6 grid'>
            <Label className='justify-self-start pb-3' htmlFor='Date'>
              Date
            </Label>
            <DatePicker2 handleDateChange={handleDateChange} />
          </div>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format='DD-MM-YYYY'
              value={departureDate}
              label='Date'
              slotProps={{ field: { clearable: false } }}
              onChange={(newDate) => setDepartureDate(newDate)}
            />
          </LocalizationProvider> */}
          <Button className='mb-4' onClick={() => findFlightDetails()}>
            Find Flight
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
      {flightDetails && <AddJourney flight={flightDetails} />}
    </>
  );
}
