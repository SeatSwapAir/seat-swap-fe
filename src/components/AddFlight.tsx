import { useEffect, useState } from 'react';

import { TextField, Button, Typography } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs, { Dayjs } from 'dayjs';

import { getFlightDetails } from '../api/seatSwapAPI';

import { useQuery } from '@tanstack/react-query';
import { FlightProps } from '../../lib/types';

import FlightForm from './FlightForm';

export default function AddFlight({
  flights,
}: {
  flights: FlightProps[] | null;
}) {
  const [flightNumberAndCarrierCode, setFlightNumberAndCarrierCode] =
    useState('FR9336');
  const [departureDate, setDepartureDate] = useState<Dayjs | null>(dayjs());

  const [openFlightSearch, setOpenFlightSearch] = useState(false);
  const [showFlightForms, setShowFlightForms] = useState(false);

  const [flightDetails, setFlightDetails] = useState<FlightProps | null>(null);
  const [doesJourneyExists, setDoesJourneyExists] = useState<boolean | null>(
    null
  );
  console.log('🚀 ~ doesJourneyExists:', doesJourneyExists);
  console.log('🚀 ~ flightDetails:', flightDetails);

  const findFlightDetails = async () => {
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
      setShowFlightForms(false);
      return;
    }
    await refetch();
    setDoesJourneyExists(false);
  };

  if (!departureDate) return;

  const scheduledDepartureDate = departureDate?.format('YYYY-MM-DD');

  const {
    data: flightsData,
    isSuccess,
    error,
    isError,
    refetch,
  } = useQuery({
    queryFn: () =>
      getFlightDetails({
        flightNumber: flightNumberAndCarrierCode,
        date: scheduledDepartureDate,
      }),
    initialData: null,
    queryKey: ['getFlightDetails'],
    enabled: false,
    refetchOnWindowFocus: false,
  });
  console.log('🚀 ~  data: ', flightsData, isSuccess, error, isError);

  useEffect(() => {
    if (isSuccess && flightsData) {
      setFlightDetails(flightsData);
    }
  }, [isSuccess, flightsData]);

  if (!openFlightSearch)
    return (
      <Button
        onClick={() => {
          setOpenFlightSearch(true);
        }}
      >
        <Add /> Add Flight
      </Button>
    );

  // const handleSubmitFlightChanges = (flightDetails: FlightProps): void => {
  //   handleAddFlight(flightDetails);
  //   setFlightDetails(null);
  //   setFlightNumberAndCarrierCode('');
  //   setDepartureDate(null);
  //   setOpen(false);
  // };
  console.log('LOCAL', flightDetails);
  console.log('🚀 ~ SERVER:', flightsData);
  console.log('🚀 ~ flightDetails:', flightDetails);

  return (
    <>
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
          onChange={(newDate) => setDepartureDate(newDate)}
        />
      </LocalizationProvider>
      <Button onClick={() => findFlightDetails()}>Find flight Details</Button>
      {showFlightForms && (
        <Button
          onClick={() => {
            setOpenFlightSearch(false);
          }}
        >
          <Close /> Cancel
        </Button>
      )}
      {flightDetails !== null && (
        <>
          <Typography>
            {flightDetails?.airline} - {flightDetails?.departureairport} -{'>'}
            {flightDetails?.arrivalairport} - {flightDetails?.departuretime}
            {!doesJourneyExists && !showFlightForms && (
              <Button onClick={() => setShowFlightForms(true)}>
                This is my flight!
              </Button>
            )}
            {doesJourneyExists && ' This flight has already been added'}
          </Typography>
          {showFlightForms && (
            <FlightForm
              flight={flightDetails}
              setIsEditing={setShowFlightForms}
            />
          )}
        </>
      )}
    </>
  );
}
