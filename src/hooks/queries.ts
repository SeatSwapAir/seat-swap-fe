import { useQuery } from '@tanstack/react-query';
import {
    getFlightsByUserId,
    getFlightDetails
  } from '../api/seatSwapAPI';

export function useFlightsByUserId(id: number) {
    return useQuery({
      queryFn: () => getFlightsByUserId(id),
      queryKey: ['getFlightsByUser'],
    });

  }

  export function useFlightDetails(flightNumber: string, date: string) {
    return useQuery({
        queryFn: () =>
          getFlightDetails({
            flightNumber: flightNumber,
            date: date,
          }),
        initialData: null,
        queryKey: ['getFlightDetails'],
        enabled: false,
        refetchOnWindowFocus: false,
      })
  }

