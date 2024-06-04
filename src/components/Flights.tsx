import { useState } from 'react';
import { Typography, CardContent, Card } from '@mui/material';

import FlightCard from './FlightCard';
import AddFlight from './AddFlight';
import {
  FlightCardProps,
  FlightProps,
  Preferences,
  Seat,
} from '../../lib/types';

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
    preferences: {
      location: '',
      extraLegroom: false,
      position: '',
      neighbouringRows: true,
      sameRow: false,
      sideBySide: true,
    },
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
    preferences: {
      location: '',
      extraLegroom: false,
      position: '',
      neighbouringRows: false,
      sameRow: true,
      sideBySide: false,
    },
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
    preferences: {
      location: '',
      extraLegroom: false,
      position: 'window',
      neighbouringRows: true,
      sameRow: true,
      sideBySide: false,
    },
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
  const handleRemoveFlight: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const flightNumberAndDate = event.currentTarget.value;
    const newFlights = flights.filter(
      (flight) =>
        flight.flightNumber + flight.departureTime !== flightNumberAndDate
    );
    setFlights(newFlights);
  };
  function handleUpdateSeat(
    seat: Seat,
    flightNumber: string,
    oldSeat: string
  ): void {
    setFlights((prevFlights) => {
      return prevFlights.map((flight) => {
        if (flight.flightNumber === flightNumber) {
          const updatedSeats = flight.seats.map((s) =>
            s.number === oldSeat ? seat : s
          );
          return { ...flight, seats: updatedSeats };
        }
        return flight;
      });
    });
  }
  function handleUpdatePreferences(
    updatedPreferences: Preferences,
    flightNumber: string
  ): void {
    setFlights((prevFlights) => {
      console.log(updatedPreferences);
      return prevFlights.map((flight) => {
        if (flight.flightNumber === flightNumber) {
          return { ...flight, preferences: updatedPreferences };
        }
        return flight;
      });
    });
  }

  function handleAddFlight(flight: FlightProps): void {
    let exists = flights.filter(
      (entry) =>
        entry.flightNumber === flight.flightNumber &&
        entry.departureTime === flight.departureTime
    );
    console.log(exists);
    if (exists.length > 0) {
      console.log('flight exists already');
    } else {
      const flightsCopy = [...flights];
      flightsCopy.push(flight);
      setFlights(flightsCopy);
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h2' gutterBottom>
          Flights
        </Typography>
        {flights.map((flight, index) => (
          <FlightCard
            key={index + flight.flightNumber}
            flight={flight}
            handleDelete={handleDelete}
            handleRemoveFlight={handleRemoveFlight}
            handleUpdateSeat={handleUpdateSeat}
            handleUpdatePreferences={handleUpdatePreferences}
            handleAddFlight={handleAddFlight}
          />
        ))}
        <AddFlight handleAddFlight={handleAddFlight} />
      </CardContent>
    </Card>
  );
};

export default Flights;
