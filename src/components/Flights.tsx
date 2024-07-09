import { Typography, CardContent, Card } from '@mui/material';

import FlightCard from './FlightCard';
import AddFlight from './AddFlight';
import { FlightProps } from '../../lib/types';
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
        console.log('🚀 ~ useOptimisticDeleteFlight ~ params:', params);
        console.log('🚀 ~ useOptimisticDeleteFlight ~ error:', error);
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

  const handleRemoveFlight: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const flight_id = Number(event.currentTarget.value);
    deleteFlightMutation.mutate({ user_id: 24, flight_id });
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
              />
            );
          })}
        {isError && axios.isAxiosError(error) && (
          <Typography variant='body1' color='error'>
            {error.response?.data?.msg || error.message}
          </Typography>
        )}
        <AddFlight flights={flightsData || []} />
      </CardContent>
    </Card>
  );
};

export default Flights;
