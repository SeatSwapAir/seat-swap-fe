import { Typography, Button, CardContent, Card } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { FlightCardProps } from '../../lib/types';
import Seat from './Seat';
import FlightForm from './FlightForm';
import FlightInfo from './FlightInfo';
import FlightPreferences from './FlightPreferences';
import { useState } from 'react';
import GroupSeatOffers from './GroupSeatOffers';

export default function FlightCard({
  flight,
  handleRemoveFlight,
}: FlightCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    id,
    flightnumber,
    departureairport,
    arrivalairport,
    departuretime,
    arrivaltime,
    airline,
    seats,
    preferences,
  } = flight;
  const seatsLength = seats.length;
  return (
    <>
      <div className='flex flex-wrap justify-center gap-4'>
        <FlightInfo flight={flight} />
      </div>
      <Card>
        <CardContent>
          <Typography variant='h4' component='div' gutterBottom>
            <Typography variant='h5'>Seats</Typography>
            {!isEditing && (
              <div className='flex flex-wrap justify-center gap-4'>
                {seats.map((seat, index) => (
                  <Seat key={index + flightnumber} seat={seat} />
                ))}
              </div>
            )}
            {isEditing && (
              <FlightForm flight={flight} setIsEditing={setIsEditing} />
            )}
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)}>Edit Flight</Button>
            )}
            <Button
              variant='contained'
              color='primary'
              onClick={handleRemoveFlight}
              value={id}
            >
              <DeleteIcon />
              Remove Flight
            </Button>
            <Typography variant='h5'>Seats Offers</Typography>
            <GroupSeatOffers flight_id={id} />
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
