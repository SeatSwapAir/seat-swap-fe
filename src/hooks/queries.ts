import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { FetchContext } from '@/context/FetchContext';
import {
  getFlightsByUserId,
  getFlightDetails,
  getMatchStatus,
  getJourney,
  getAllSeats,
  getOffers,
} from '../api/seatSwapAPI';

export function useFlightsByUserId(id: number) {
  const { authAxios, isTokenReady } = useContext(FetchContext);
  return useQuery({
    queryFn: () => getFlightsByUserId(id, authAxios),
    queryKey: ['getFlightsByUser'],
    enabled: isTokenReady,
  });
}

export function useFlightDetails(flightNumber: string, date: string) {
  const { authAxios } = useContext(FetchContext);
  return useQuery({
    queryFn: () =>
      getFlightDetails(
        {
          flightNumber: flightNumber,
          date: date,
        },
        authAxios
      ),
    initialData: null,
    queryKey: ['getFlightDetails', flightNumber, date],
    enabled: false,
    refetchOnWindowFocus: false,
  });
}
export function useMatchStatus(your_seat_id: number, matched_seat_id: number) {
  const { authAxios, isTokenReady } = useContext(FetchContext);
  return useQuery({
    queryFn: () =>
      getMatchStatus(
        {
          your_seat_id: your_seat_id,
          matched_seat_id: matched_seat_id,
        },
        authAxios
      ),
    initialData: null,
    queryKey: ['getMatchStatus', your_seat_id, matched_seat_id],
    enabled: isTokenReady,
    refetchOnWindowFocus: false,
  });
}

export function useJourney(user_id: number, flight_id: string) {
  const { authAxios, isTokenReady } = useContext(FetchContext);
  return useQuery({
    queryFn: () =>
      getJourney(
        {
          user_id: user_id,
          flight_id: flight_id,
        },
        authAxios
      ),
    initialData: null,
    queryKey: ['getJourney', user_id, flight_id],
    enabled: isTokenReady,
    refetchOnWindowFocus: false,
  });
}

export function useAllSeats(user_id: number, flight_id: string) {
  const { authAxios, isTokenReady } = useContext(FetchContext);
  return useQuery({
    queryKey: ['all_matches', flight_id, user_id],
    queryFn: () => getAllSeats({ flight_id, user_id }, authAxios),
    enabled: isTokenReady,
    // initialData:
  });
}

export function useOffers(user_id: number, flight_id: string) {
  const { authAxios, isTokenReady } = useContext(FetchContext);
  return useQuery({
    queryKey: ['offers', flight_id, user_id],
    queryFn: () => getOffers({ flight_id, user_id }, authAxios),
    enabled: isTokenReady,
    // initialData:
  });
}
