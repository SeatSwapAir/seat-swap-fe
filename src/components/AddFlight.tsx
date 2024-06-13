import { useState } from 'react';

import { TextField, Button, Typography } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { FlightProps, FlightCardProps, AddFlightProps } from '../../lib/types';

import { getToken, getFlightDetails } from '../api/amadeusAPI';
import Seat from './Seat';

export default function AddFlight({
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
  const [isFlightAdded, setIsFlightAdded] = useState(false);
  const [departureDate, setDepartureDate] = useState<Dayjs | null>(null);

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
            isEditing: true,
          },
        ],
      };
    });
  };

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
  const handleDelete = (id: string): void => {
    setFlightDetails((prevFlightDetails) => {
      if (!prevFlightDetails) return prevFlightDetails;
      return {
        ...prevFlightDetails,
        seats: prevFlightDetails.seats.filter((seat) => {
          seat.id !== id;
        }),
      };
    });
  };
  const showEditSeat = (id: string): void => {
    setFlightDetails((prevFlightDetails) => {
      if (!prevFlightDetails) return prevFlightDetails;
      const updatedSeats = prevFlightDetails.seats.map((seat) => {
        if (seat.id === id) {
          console.log('🚀 ~ updatedSeats ~ seat.id :', seat.id);
          console.log('🚀 ~ updatedSeats ~ seat.isEditing :', seat.isEditing);
          return {
            ...seat,
            isEditing: !seat.isEditing,
          };
        }
        return seat;
      });
      return {
        ...prevFlightDetails,
        seats: updatedSeats,
      };
    });
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
          {flightDetails?.seats.map((seat) => (
            <Seat
              key={uuidv4()}
              seat={seat}
              flightNumber={flightDetails.flightNumber}
              handleDelete={handleDelete}
              handleUpdateSeat={handleUpdateSeat}
              showEditSeat={showEditSeat}
            />
          ))}
          <Button onClick={doAddSeat}>Add Seat</Button>
        </>
      )}
    </>
  );
}
