import { Typography, Button, CardContent, Card } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { FlightCardProps } from '../../lib/types';
import Seat from './Seat';
import FlightPreferences from './FlightPreferences';

export default function FlightCard({
  flight: {
    flightNumber,
    departureAirport,
    arrivalAirport,
    departureTime,
    arrivalTime,
    airline,
    seats,
    preferences,
  },
  handleDelete,
  handleRemoveFlight,
  handleUpdateSeat,
  handleUpdatePreferences,
}: FlightCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant='h4' component='div' gutterBottom>
          {airline} - Flight {flightNumber}
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
          {seats.map((seat, index) => (
            <Seat
              key={index + flightNumber}
              seatIndex={index + flightNumber}
              seat={seat}
              flightNumber={flightNumber}
              handleDelete={handleDelete}
              handleUpdateSeat={handleUpdateSeat}
            />
          ))}
          <FlightPreferences
            preferences={preferences}
            seats={seats}
            flightNumber={flightNumber}
            handleUpdatePreferences={handleUpdatePreferences}
          />
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
