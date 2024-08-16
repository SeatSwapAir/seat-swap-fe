import { useQuery } from '@tanstack/react-query';
import {
  getFlightsByUserId,
  getFlightDetails,
  getMatchStatus,
  getJourney,
  getAllSeats,
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
  });
}
export function useMatchStatus(your_seat_id: number, matched_seat_id: number) {
  return useQuery({
    queryFn: () =>
      getMatchStatus({
        your_seat_id: your_seat_id,
        matched_seat_id: matched_seat_id,
      }),
    initialData: null,
    queryKey: ['getMatchStatus', your_seat_id, matched_seat_id],
    enabled: true,
    refetchOnWindowFocus: false,
  });
}

export function useJourney(user_id: number, flight_id: string) {
  return useQuery({
    queryFn: () =>
      getJourney({
        user_id: user_id,
        flight_id: flight_id,
      }),
    initialData: null,
    queryKey: ['getJourney', user_id, flight_id],
    refetchOnWindowFocus: false,
  });
}

export function useAllSeats(user_id: number, flight_id: string) {
  return useQuery({
    queryKey: ['all_matches', flight_id, user_id],
    queryFn: () => getAllSeats({ flight_id, user_id }),
    enabled: true,
    // initialData:
  });
}
