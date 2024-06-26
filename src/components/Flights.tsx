import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Typography, CardContent, Card } from '@mui/material';

import FlightCard from './FlightCard';
import AddFlight from './AddFlight';
import { FlightCardProps, AddFlightProps, FlightProps } from '../../lib/types';
import {
  getFlightsByUserId,
  deleteFlightByUserFlightId,
} from '../api/seatSwapAPI';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const mockFlights: FlightCardProps['flight'][] = [
  {
    id: uuidv4(),
    flightnumber: 'FR504',
    departureairport: 'STN',
    arrivalairport: 'BCN',
    departuretime: '2024-05-14T08:30:00',
    arrivaltime: '2024-05-14T11:45:00',
    airline: 'Ryanair',
    seats: [
      {
        number: '1A',
        location: 'front',
        extraLegroom: true,
        position: 'aisle',
        id: '23423423',
        isEditing: false,
      },
      {
        number: '10B',
        location: 'middle',
        extraLegroom: false,
        position: 'middle',
        id: '3463546435',
        isEditing: false,
      },
      {
        number: '25C',
        location: 'back',
        extraLegroom: false,
        position: 'window',
        id: '325325345',
        isEditing: false,
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
    id: uuidv4(),
    flightnumber: 'W63321',
    departureairport: 'BUD',
    arrivalairport: 'CPH',
    departuretime: '2024-05-14T15:00:00',
    arrivaltime: '2024-05-14T16:50:00',
    airline: 'Wizz Air',
    seats: [
      {
        number: '30D',
        location: 'back',
        extraLegroom: false,
        position: 'aisle',
        id: '23423235',
        isEditing: false,
      },
      {
        number: '15A',
        location: 'middle',
        extraLegroom: true,
        position: 'window',
        id: '1243235',
        isEditing: false,
      },
      {
        number: '5B',
        location: 'front',
        extraLegroom: false,
        position: 'middle',
        id: '23545346',
        isEditing: false,
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
    id: uuidv4(),
    flightnumber: 'U24832',
    departureairport: 'CDG',
    arrivalairport: 'LIS',
    departuretime: '2024-05-14T21:30:00',
    arrivaltime: '2024-05-14T23:15:00',
    airline: 'easyJet',
    seats: [
      {
        number: '3C',
        location: 'front',
        extraLegroom: true,
        position: 'middle',
        id: '2354532346',
        isEditing: false,
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
  // const [flights, setFlights] = useState(mockFlights);
  const {
    data: flightsData,
    isSuccess,
    error,
    isError,
  } = useQuery({
    queryFn: () => getFlightsByUserId(2),
    queryKey: ['getFlightsByUser'],
  });

  console.log(axios.isAxiosError(error) && error.response?.data?.msg);

  const useOptimisticDeleteFlight = function () {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: deleteFlightByUserFlightId,
      onMutate: async (user_flight_id: Number) => {
        await queryClient.cancelQueries({ queryKey: ['getFlightsByUser'] });
        const previousFlights = queryClient.getQueryData(['getFlightsByUser']);
        queryClient.setQueryData(['getFlightsByUser'], (old: FlightProps[]) =>
          old.filter((f) => Number(f.id) !== user_flight_id)
        );
        return { previousFlights };
      },
      onError: (context: { previousFlights: FlightProps[] }) => {
        queryClient.setQueryData(['getFlightsByUser'], context.previousFlights);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['getFlightsByUser'] });
      },
    });
  };

  const deleteFlightMutation = useOptimisticDeleteFlight();

  const checkIfFlightIsThere: AddFlightProps['checkIfFlightIsThere'] = (
    flightNumber,
    departureTime
  ) => {
    return true;
    // flights.some(
    //   (flightObj) =>
    //     flightObj.flightnumber === flightNumber &&
    //     flightObj.departuretime === departureTime
    // );
  };
  const handleRemoveFlight: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const flightNumberAndDate = event.currentTarget.value;
    // const newFlights = flights.filter(
    //   (flight) =>
    //     flight.flightnumber + flight.departuretime !== flightNumberAndDate
    // );
    // setFlights(newFlights);
    // useOptimisticDeleteFlight.mutate(Number(event.currentTarget.value));
    const user_flight_id = Number(event.currentTarget.value);
    deleteFlightMutation.mutate(user_flight_id);
  };
  const handleUpdateSeat: FlightCardProps['handleUpdateSeat'] = (
    seat,
    flightNumber
  ) => {
    // setFlights((prevFlights) => {
    //   return prevFlights.map((flight) => {
    //     if (flight.flightnumber === flightNumber) {
    //       const updatedSeats = flight.seats.map((s) =>
    //         s.id === seat.id ? seat : s
    //       );
    //       return { ...flight, seats: updatedSeats };
    //     }
    //     return flight;
    //   });
    // });
  };
  const handleUpdatePreferences: FlightCardProps['handleUpdatePreferences'] = (
    updatedPreferences,
    flightNumber
  ) => {
    // setFlights((prevFlights) => {
    //   return prevFlights.map((flight) => {
    //     if (flight.flightnumber === flightNumber) {
    //       return { ...flight, preferences: updatedPreferences };
    //     }
    //     return flight;
    //   });
    // });
  };
  const handleAddFlight: AddFlightProps['handleAddFlight'] = (flight) => {
    if (checkIfFlightIsThere(flight.flightnumber, flight.departuretime)) {
      return true;
    }
    // setFlights([...flights, flight]);
    return true;
  };
  const handleSubmitFlightChanges: FlightCardProps['handleSubmitFlightChanges'] =
    (flightDetails) => {
      // const newFlights = flights.map((flight) => {
      //   if (flight.id === flightDetails.id) {
      //     return {
      //       ...flight,
      //       preferences: flightDetails.preferences,
      //       seats: flightDetails.seats,
      //     };
      //   }
      //   return flight;
      // });
      // setFlights(newFlights);
    };
  return (
    <Card>
      <CardContent>
        <Typography variant='h2' gutterBottom>
          Flights
        </Typography>
        {isSuccess &&
          flightsData.map((flight) => {
            return (
              <FlightCard
                key={flight.id}
                flight={flight}
                handleRemoveFlight={handleRemoveFlight}
                handleUpdateSeat={handleUpdateSeat}
                handleUpdatePreferences={handleUpdatePreferences}
                handleSubmitFlightChanges={handleSubmitFlightChanges}
              />
            );
          })}
        {isError && axios.isAxiosError(error) && (
          <Typography variant='body1' color='error'>
            {error.response?.data?.msg || error.message}
          </Typography>
        )}
        <AddFlight
          checkIfFlightIsThere={checkIfFlightIsThere}
          handleAddFlight={handleAddFlight}
        />
      </CardContent>
    </Card>
  );
};

export default Flights;
