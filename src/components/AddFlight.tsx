import { TextField, Button, Typography } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { useState } from 'react';
import axios from 'axios';

import { FlightProps } from '../../lib/types';
import { FlightCardProps } from '../../lib/types';

export default function AddFlight({
  handleAddFlight,
}: {
  handleAddFlight: FlightCardProps['handleAddFlight'];
}) {
  const [open, setOpen] = useState(false);
  const [flightNumberAndCarrierCode, setFlightNumberAndCarrierCode] =
    useState('FR9336');
  const [flightDetails, setFlightDetails] = useState<FlightProps | null>(null);
  console.log(flightDetails);
  const getToken = async () => {
    const bodyParameters = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: import.meta.env.VITE_AMADEUS_API_KEY,
      client_secret: import.meta.env.VITE_AMADEUS_API_SECRET,
    });
    try {
      const response = await axios.post(
        `https://test.api.amadeus.com/v1/security/oauth2/token`,
        bodyParameters,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.log('error', error);
    }
  };

  const findFlightDetails = async () => {
    const token = await getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const carrierCode = flightNumberAndCarrierCode.slice(0, 2);
    const flightNumber = flightNumberAndCarrierCode.slice(2);
    const scheduledDepartureDate = '2024-06-18';
    const response = await axios.get(
      `https://test.api.amadeus.com/v2/schedule/flights?carrierCode=${carrierCode}&flightNumber=${flightNumber}&scheduledDepartureDate=${scheduledDepartureDate}`,
      {
        headers,
      }
    );
    const airline = await axios.get(
      `https://test.api.amadeus.com/v1/reference-data/airlines?airlineCodes=${carrierCode}`,
      {
        headers,
      }
    );

    setFlightDetails({
      flightNumber:
        response.data.data[0].flightDesignator.carrierCode +
        response.data.data[0].flightDesignator.flightNumber,
      departureAirport: response.data.data[0].flightPoints[0].iataCode,
      arrivalAirport: response.data.data[0].flightPoints[1].iataCode,
      departureTime:
        response.data.data[0].flightPoints[0].departure.timings[0].value,
      arrivalTime:
        response.data.data[0].flightPoints[1].arrival.timings[0].value,
      airline: airline.data.data[0].commonName,
      seats: [],
      preferences: {
        location: '',
        extraLegroom: false,
        position: '',
        neighbouringRows: false,
        sameRow: true,
        sideBySide: false,
      },
    });
  };

  const doSubmitFlight = () => {
    if (flightDetails) {
      handleAddFlight(flightDetails);
    }
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
      <Button onClick={findFlightDetails}>Find flight Details</Button>
      <Button
        onClick={() => {
          setOpen(false);
        }}
      >
        <Close /> Cancel
      </Button>
      <Typography>
        {' '}
        {flightDetails?.airline} - {flightDetails?.departureAirport} -{'>'}{' '}
        {flightDetails?.arrivalAirport}
        <Button onClick={doSubmitFlight}>This is my flight!</Button>
      </Typography>
    </>
  );
}
