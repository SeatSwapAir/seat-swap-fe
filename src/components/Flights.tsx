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

const Flights = () => {
  const {
    data: flightsData,
    isSuccess,
    error,
    isError,
  } = useQuery({
    queryFn: () => getFlightsByUserId(24),
    queryKey: ['getFlightsByUser'],
  });

  console.log(axios.isAxiosError(error) && error.response?.data?.msg);

  const useOptimisticDeleteFlight = function () {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: deleteFlightByUserFlightId,
      onMutate: async (params: { user_id: number; flight_id: number }) => {
        await queryClient.cancelQueries({ queryKey: ['getFlightsByUser'] });
        const previousFlights = queryClient.getQueryData<FlightProps[]>([
          'getFlightsByUser',
        ]);
        if (previousFlights) {
          queryClient.setQueryData(
            ['getFlightsByUser'],
            previousFlights.filter((f) => Number(f.id) !== params.flight_id)
          );
        }
        return { previousFlights: previousFlights || [] };
      },
      onError: (error, params, context) => {
        if (context?.previousFlights) {
          queryClient.setQueryData(
            ['getFlightsByUser'],
            context.previousFlights
          );
        }
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
    const flight_id = Number(event.currentTarget.value);
    deleteFlightMutation.mutate({ user_id: 2, flight_id });
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
