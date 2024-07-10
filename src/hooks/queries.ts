import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
    getFlightsByUserId,
    deleteFlightByUserFlightId,
  } from '../api/seatSwapAPI';

export function useFlightsByUserId(id: number) {
    const { data: flightsData, isSuccess, error, isError } = useQuery({
      queryFn: () => getFlightsByUserId(id),
      queryKey: ['getFlightsByUser'],
    });
  
    return {
      data: flightsData,
      isSuccess,
      error,
      isError,
    };
  }
