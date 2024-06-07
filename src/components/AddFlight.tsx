import { useState } from 'react';

import { TextField, Button, Typography } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import axios from 'axios';
import { Dayjs } from 'dayjs';

import { FlightProps, FlightCardProps, AddFlightProps } from '../../lib/types';

import SeatForm from './SeatForm';

import { v4 as uuidv4 } from 'uuid';

export default function AddFlight({
  handleAddFlight,
  checkIfFlightIsThere,
}: {
  handleAddFlight: AddFlightProps['handleAddFlight'];
  checkIfFlightIsThere: AddFlightProps['checkIfFlightIsThere'];
}) {
  const [open, setOpen] = useState(false);
  const [showFlightForms, setShowFlightForms] = useState(false);
  const [flightNumberAndCarrierCode, setFlightNumberAndCarrierCode] =
    useState('FR9336');
  const [flightDetails, setFlightDetails] = useState<FlightProps | null>(null);
  console.log('🚀 ~ flightDetails:', flightDetails);
  const [isFlightAdded, setIsFlightAdded] = useState(false);
  // console.log('🚀 ~ isFlightAdded:', isFlightAdded);
  const [departureDate, setDepartureDate] = useState<Dayjs | null>(null);
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

  console.log('🚀 ~ FLOGHT NOT ADDED:', !isFlightAdded);

  const handleUpdateSeat: FlightCardProps['handleUpdateSeat'] = (newSeat) => {
    if (!flightDetails) return;
    const updatedSeats =
      flightDetails.seats.map((s) => (s.id === newSeat.id ? newSeat : s)) ?? [];
    setFlightDetails({ ...flightDetails, seats: updatedSeats });
  };

  const doAddSeat = () => {
    setFlightDetails((prevDetails) => {
      if (!prevDetails) return prevDetails;
      return {
        ...prevDetails,
        seats: [
          ...prevDetails?.seats,
          {
            number: '',
            location: '',
            extraLegroom: false,
            position: '',
            id: uuidv4(),
          },
        ],
      };
    });
  };

  const doSeatFormChange = () => {
    setShowFlightForms(false);
  };
  const findFlightDetails = async () => {
    const token = await getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const carrierCode = flightNumberAndCarrierCode.slice(0, 2);
    const flightNumber = flightNumberAndCarrierCode.slice(2);
    const scheduledDepartureDate = departureDate?.format('YYYY-MM-DD');
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
    setIsFlightAdded(
      checkIfFlightIsThere(
        response.data.data[0].flightDesignator.carrierCode +
          response.data.data[0].flightDesignator.flightNumber,
        response.data.data[0].flightPoints[0].departure.timings[0].value
      )
    );
  };

  const doSubmitFlight = () => {
    console.log('🚀 ~ doSubmitFlight ~ flightDetails:', flightDetails);
    if (flightDetails) {
      setIsFlightAdded(handleAddFlight(flightDetails));
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format='DD-MM-YYYY'
          value={departureDate}
          label='Date'
          onChange={(newDate) => setDepartureDate(newDate)}
        />
      </LocalizationProvider>
      <Button onClick={findFlightDetails}>Find flight Details</Button>
      <Button
        onClick={() => {
          setOpen(false);
        }}
      >
        <Close /> Cancel
      </Button>
      {flightDetails !== null && (
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
      )}
      {showFlightForms && (
        <>
          {flightDetails?.seats.map((seat, index) => (
            <SeatForm
              key={index}
              seat={seat}
              flightNumber={flightDetails.flightNumber}
              handleUpdateSeat={handleUpdateSeat}
              doSeatFormChange={doSeatFormChange}
            />
          ))}
          <Button onClick={doAddSeat}>Add Seat</Button>
        </>
      )}
    </>
  );
}
