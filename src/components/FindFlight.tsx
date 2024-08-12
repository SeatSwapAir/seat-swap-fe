import { useEffect, useState } from 'react';

import { TextField, Button, Typography } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
        <>
          <h1>Find Your Flight</h1>
          <h4>Adventure is calling!</h4>
          <TextField
            InputLabelProps={{ shrink: true }}
            id='outlined-controlled'
            label='Flight Number'
            value={flightNumberAndCarrierCode}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFlightNumberAndCarrierCode(event.target.value);
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format='DD-MM-YYYY'
              value={departureDate}
              label='Date'
              slotProps={{ field: { clearable: false } }}
              onChange={(newDate) => setDepartureDate(newDate)}
            />
          </LocalizationProvider>
          <Button onClick={() => findFlightDetails()}>Find Flight</Button>
        </>
      )}
      {flightDetails !== null && (
        <>
          <Typography>
            {doesJourneyExists && ' This flight has already been added'}
          </Typography>
        </>
      )}
      {flightDetails && <AddJourney flightDetails={flightDetails} />}
    </>
  );
}
