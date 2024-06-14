import { Typography, Button, CardContent, Card } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { FlightCardProps, FlightProps } from '../../lib/types';
import Seat from './Seat';
import FlightForm from './FlightForm';
import FlightPreferences from './FlightPreferences';
import { useState } from 'react';

export default function FlightCard({
  flight,
  handleDelete,
  handleRemoveFlight,
  handleUpdatePreferences,
  handleSubmitFlightChanges,
}: FlightCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    flightNumber,
    departureAirport,
    arrivalAirport,
    departureTime,
    arrivalTime,
    airline,
    seats,
    preferences,
  } = flight;

  const doSubmitFlightChanges = (flightDetails: FlightProps) => {
    handleSubmitFlightChanges(flightDetails);
    setIsEditing(false);
  };
  return (
    <Card>
      <CardContent>
        <Typography variant='h4' component='div' gutterBottom>
          {airline} - Flight {flightNumber}
          <Button onClick={() => setIsEditing(true)}>Edit Flight</Button>
          <Typography variant='body1'>
            Departure Airport: {departureAirport}
          </Typography>
          <Typography variant='body1'>
            Arrival Airport: {arrivalAirport}
          </Typography>
          <Typography variant='body1'>
            Departure Time: {departureTime}
          </Typography>
          <Typography variant='body1'>Arrival Time: {arrivalTime}</Typography>
          <Typography variant='h5'>Seats</Typography>
          {!isEditing && (
            <>
              {seats.map((seat, index) => (
                <Seat
                  key={index + flightNumber}
                  seat={seat}
                  flightNumber={flightNumber}
                  handleDelete={handleDelete}
                />
              ))}
              <FlightPreferences
                preferences={preferences}
                seats={seats}
                flightNumber={flightNumber}
                handleUpdatePreferences={handleUpdatePreferences}
              />
            </>
          )}
          {isEditing && (
            <FlightForm
              flight={flight}
              handleSubmitFlightChanges={doSubmitFlightChanges}
            />
          )}
          <Button
            variant='contained'
            color='primary'
            onClick={handleRemoveFlight}
            value={flightNumber + departureTime}
          >
            <DeleteIcon />
            Remove Flight
          </Button>
        </Typography>
      </CardContent>
    </Card>
  );
}
