import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

import FlightCard from './FlightCard';
import { FlightCardProps } from '../../lib/types';

const mockFlights: FlightCardProps['flight'][] = [
  {
    flightNumber: 'FR504',
    departureAirport: 'STN',
    arrivalAirport: 'BCN',
    departureTime: '2024-05-14T08:30:00',
    arrivalTime: '2024-05-14T11:45:00',
    airline: 'Ryanair',
    seats: [
      {
        number: '1A',
        location: 'front',
        extraLegroom: true,
        position: 'aisle',
      },
      {
        number: '10B',
        location: 'middle',
        extraLegroom: false,
        position: 'middle',
      },
      {
        number: '25C',
        location: 'back',
        extraLegroom: false,
        position: 'window',
      },
    ],
    preferences: [
      {
        location: 'none',
        extraLegroom: false,
        position: 'none',
        neighbouringRows: true,
        sameRow: false,
        sideBySide: true,
      },
    ],
  },
  {
    flightNumber: 'W63321',
    departureAirport: 'BUD',
    arrivalAirport: 'CPH',
    departureTime: '2024-05-14T15:00:00',
    arrivalTime: '2024-05-14T16:50:00',
    airline: 'Wizz Air',
    seats: [
      {
        number: '30D',
        location: 'back',
        extraLegroom: false,
        position: 'aisle',
      },
      {
        number: '15A',
        location: 'middle',
        extraLegroom: true,
        position: 'window',
      },
      {
        number: '5B',
        location: 'front',
        extraLegroom: false,
        position: 'middle',
      },
    ],
    preferences: [
      {
        location: 'none',
        extraLegroom: false,
        position: 'none',
        neighbouringRows: false,
        sameRow: true,
        sideBySide: false,
      },
    ],
  },
  {
    flightNumber: 'U24832',
    departureAirport: 'CDG',
    arrivalAirport: 'LIS',
    departureTime: '2024-05-14T21:30:00',
    arrivalTime: '2024-05-14T23:15:00',
    airline: 'easyJet',
    seats: [
      {
        number: '3C',
        location: 'front',
        extraLegroom: true,
        position: 'middle',
      },
    ],
    preferences: [
      {
        location: 'none',
        extraLegroom: false,
        position: 'window',
        neighbouringRows: true,
        sameRow: true,
        sideBySide: false,
      },
    ],
  },
];
const Flights = () => {
  const [flights, setFlights] = useState(mockFlights);
  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const seatNumber = event.currentTarget.value;
    setFlights((prevFlights) => {
      return prevFlights.map((flight) => {
        return {
          ...flight,
          seats: flight.seats.filter((seat) => seat.number !== seatNumber),
        };
      });
    });
  };
  return (
    <Card>
      <CardContent>
        <Typography variant='h2' gutterBottom>
          Flights
        </Typography>
        {flights.map((flight, index) => (
          <FlightCard key={index} flight={flight} handleDelete={handleDelete} />
        ))}
      </CardContent>
    </Card>
  );
};

export default Flights;
