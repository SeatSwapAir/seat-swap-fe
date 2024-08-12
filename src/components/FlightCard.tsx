import { Typography, Button, CardContent, Card } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { FlightCardProps } from '../../lib/types';
import Seat from './Seat';
import FlightForm from './FlightForm';
import FlightInfo from './FlightInfo';
import { useState } from 'react';
import GroupSeatOffers from './GroupSeatOffers';
import SoloSeatOffers from './SoloSeatOffers';

export default function FlightCard({
  flight,
  handleRemoveFlight,
}: FlightCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const numberOfSeats = flight.seats.length;
  const { seats, ...rest } = flight;

  const seatsSwapped = seats.filter((seat) => seat.previous_user_id !== null);

  return (
    <>
      <div className='flex flex-wrap justify-center gap-4'>
        <FlightInfo flightDetails={rest} />
      </div>
      <Card>
        <CardContent>
          <Typography variant='h4' component='div' gutterBottom>
            <Typography variant='h5'>Seats</Typography>
            {!isEditing && (
              <div className='flex flex-wrap justify-center gap-4'>
                {seats.map((seat, index) => (
                  <Seat key={index + rest.flightnumber} seat={seat} />
                ))}
              </div>
            )}
            {isEditing && (
              <FlightForm flight={flight} setIsEditing={setIsEditing} />
            )}
            {!isEditing && (
              <Button
                disabled={seatsSwapped.length !== 0}
                onClick={() => setIsEditing(true)}
              >
                Edit Flight
              </Button>
            )}
            <Button
              variant='contained'
              color='primary'
              onClick={handleRemoveFlight}
              value={rest.id}
            >
              <DeleteIcon />
              Remove Flight
            </Button>
            <Typography variant='h5'>Seats Offers</Typography>
            {numberOfSeats > 1 && <GroupSeatOffers flight_id={rest.id} />}
            {numberOfSeats === 1 && <SoloSeatOffers flight_id={rest.id} />}
            {numberOfSeats === 0 && <div>Add your seats to get offers</div>}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
