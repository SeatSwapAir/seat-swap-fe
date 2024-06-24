import { Typography, Button, CardContent, Card } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { FlightCardProps, FlightProps } from '../../lib/types';
import Seat from './Seat';
import FlightForm from './FlightForm';
import FlightPreferences from './FlightPreferences';
import { useState } from 'react';

export default function FlightCard({
  flight,
  handleRemoveFlight,
  handleSubmitFlightChanges,
}: FlightCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    flightnumber,
    departureairport,
    arrivalairport,
    departuretime,
    arrivaltime,
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
          {airline} - Flight {flightnumber}
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>Edit Flight</Button>
          )}
          <Typography variant='body1'>
            Departure Airport: {departureairport}
          </Typography>
          <Typography variant='body1'>
            Arrival Airport: {arrivalairport}
          </Typography>
          <Typography variant='body1'>
            Departure Time: {departuretime}
          </Typography>
          <Typography variant='body1'>Arrival Time: {arrivaltime}</Typography>
          <Typography variant='h5'>Seats</Typography>
          {!isEditing && (
            <>
              {seats.map((seat, index) => (
                <Seat
                  key={index + flightnumber}
                  seat={seat}
                  flightNumber={flightnumber}
                />
              ))}
              <FlightPreferences preferences={preferences} />
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
            value={flightnumber + departuretime}
          >
            <DeleteIcon />
            Remove Flight
          </Button>
        </Typography>
      </CardContent>
    </Card>
  );
}
