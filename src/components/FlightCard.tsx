import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import { FlightCardProps } from '../../lib/types';

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
            <Typography key={index} variant='body2'>
              Seat {seat.number} - {seat.location} - {seat.position} -{' '}
              {seat.extraLegroom ? 'Extra Legroom' : 'Standard Legroom'}
            </Typography>
          ))}
          <Typography variant='h5'>Preferences</Typography>
          {preferences.map((preference, index) => (
            <Typography key={index} variant='body2'>
              Location: {preference.location} - Position: {preference.position}{' '}
              - {preference.extraLegroom ? 'Extra Legroom' : 'Standard Legroom'}{' '}
              -{' '}
              {preference.neighbouringRows
                ? 'Neighbouring Rows'
                : 'No Neighbouring Rows'}{' '}
              - {preference.sameRow ? 'Same Row' : 'Different Row'} -{' '}
              {preference.sideBySide ? 'Side by Side' : 'No Side by Side'}
            </Typography>
          ))}
        </Typography>
      </CardContent>
    </Card>
  );
}
