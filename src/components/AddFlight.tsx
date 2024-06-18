import { useState } from 'react';

import { TextField, Button, Typography } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Dayjs } from 'dayjs';

import { FlightProps, AddFlightProps } from '../../lib/types';

import { getToken, getFlightDetails } from '../api/amadeusAPI';
import FlightForm from './FlightForm';

export default function AddFlight({
  checkIfFlightIsThere,
  handleAddFlight,
}: {
  handleAddFlight: AddFlightProps['handleAddFlight'];
  checkIfFlightIsThere: AddFlightProps['checkIfFlightIsThere'];
}) {
  const [open, setOpen] = useState(false);
  const [showFlightForms, setShowFlightForms] = useState(false);
  const [flightNumberAndCarrierCode, setFlightNumberAndCarrierCode] =
    useState('FR9336');
  const [flightDetails, setFlightDetails] = useState<FlightProps | null>(null);
  const [isFlightAdded, setIsFlightAdded] = useState(false);
  const [departureDate, setDepartureDate] = useState<Dayjs | null>(null);

  const findFlightDetails = async () => {
    const token = await getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const carrierCode = flightNumberAndCarrierCode.slice(0, 2);
    const flightNumber = flightNumberAndCarrierCode.slice(2);
    const scheduledDepartureDate = departureDate?.format('YYYY-MM-DD');
    const response = await getFlightDetails(
      carrierCode,
      flightNumber,
      scheduledDepartureDate,
      headers
    );
    if (!response) return;
    setFlightDetails(response);
    setIsFlightAdded(
      checkIfFlightIsThere(response.flightNumber, response.arrivalTime)
    );
  };

  if (!open)
    return (
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        <Add /> Add Flight
      </Button>
    );

  const handleSubmitFlightChanges = (flightDetails: FlightProps): void => {
    handleAddFlight(flightDetails);
    setFlightDetails(null);
    setFlightNumberAndCarrierCode('');
    setDepartureDate(null);
    setOpen(false);
  };

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
      <Button onClick={findFlightDetails}>Find flight Details</Button>
      {showFlightForms && (
        <Button
          onClick={() => {
            setOpen(false);
          }}
        >
          <Close /> Cancel
        </Button>
      )}
      {flightDetails !== null && (
        <>
          <Typography>
            {flightDetails?.airline} - {flightDetails?.departureAirport} -{'>'}
            {flightDetails?.arrivalAirport}
            {!isFlightAdded && !showFlightForms && (
              <Button onClick={() => setShowFlightForms(true)}>
                This is my flight!
              </Button>
            )}
            {isFlightAdded && ' This flight has already been added'}
          </Typography>
          {showFlightForms && (
            <FlightForm
              flight={flightDetails}
              handleSubmitFlightChanges={handleSubmitFlightChanges}
            />
          )}
        </>
      )}
    </>
  );
}
