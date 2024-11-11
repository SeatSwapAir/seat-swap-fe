import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import {
  deleteFlightByUserFlightId,
  postJourney,
  postSwapRequest,
  updateFlightByUserFlightId,
  patchSwapRequest,
  getSeat,
  patchSeat,
  postSeat,
  deleteSeat,
} from '../api/seatSwapAPI';
import { FlightProps, SeatProps } from '../../lib/types';
import { FetchContext } from '@/context/FetchContext';
import { useContext } from 'react';

export function useOptimisticDeleteFlight() {
  const { authAxios } = useContext(FetchContext);
  const queryClient = useQueryClient();

  return useMutation({
    // Use a conditional to ensure `authAxios` is available before calling the API function
    mutationFn: (params: { user_id: number; flight_id: number }) => {
      if (!authAxios) {
        throw new Error('Authentication client is not available.');
      }
      return deleteFlightByUserFlightId(params, authAxios);
    },
    onMutate: async (params) => {
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
        queryClient.setQueryData(['getFlightsByUser'], context.previousFlights);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getFlightsByUser'] });
    },
  });
}

export function usePostJourney() {
  const { authAxios } = useContext(FetchContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      body: FlightProps;
      params: { user_id: number; flight_id: number };
    }) => {
      if (!authAxios) {
        throw new Error('Authentication client is not available.');
      }
      // Pass both data and authAxios to postJourney
      return postJourney(data, authAxios);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['getFlightsByUser'] });
      return data;
    },
    onError: (err) => {
      console.log('🚀 ~ usePostJourney ~ onError ~ err:', err);
    },
  });
}

export function usePatchJourney() {
  const { authAxios } = useContext(FetchContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      body: FlightProps;
      params: { user_id: number; flight_id: number };
    }) => {
      if (!authAxios) {
        throw new Error('Authentication client is not available.');
      }
      // Pass both data and authAxios to updateFlightByUserFlightId
      return updateFlightByUserFlightId(data, authAxios);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['getFlightsByUser'] });
      return data;
    },
    onError: (err) => {
      console.error('🚀 ~ usePatchJourney ~ onError ~ err:', err);
      throw err;
    },
  });
}

export function usePostSwapRequest(
  your_seat_id: number,
  matched_seat_id: number
) {
  const { authAxios } = useContext(FetchContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      body: { requester_seat_id: number; respondent_seat_id: number };
    }) => {
      if (!authAxios) {
        throw new Error('Authentication client is not available.');
      }
      // Pass both data and authAxios to postSwapRequest
      return postSwapRequest(data, authAxios);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['getMatchStatus', your_seat_id, matched_seat_id],
      });
      queryClient.invalidateQueries({
        queryKey: ['offers'],
      });
      return data;
    },
    onError: (err) => {
      console.log('🚀 ~ usePostSwapRequest ~ onError ~ err:', err);
    },
  });
}
export function usePatchSwapRequest(
  your_seat_id: number,
  matched_seat_id: number
) {
  const { authAxios } = useContext(FetchContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      body: { action: string };
      params: { swap_id: number };
    }) => {
      if (!authAxios) {
        throw new Error('Axios instance is not available');
      }
      return patchSwapRequest(data, authAxios);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['getMatchStatus', your_seat_id, matched_seat_id],
      });
      queryClient.invalidateQueries({ queryKey: ['offers'] });
      queryClient.invalidateQueries({ queryKey: ['getJourney'] });
      queryClient.invalidateQueries({ queryKey: ['all_matches'] });

      if (variables.body.action === 'accept') {
        Promise.all([
          queryClient.invalidateQueries({ queryKey: ['getFlightsByUser'] }),
          queryClient.invalidateQueries({ queryKey: ['side_bySide_matches'] }),
          queryClient.invalidateQueries({ queryKey: ['same_row_matches'] }),
          queryClient.invalidateQueries({
            queryKey: ['neighbouring_rows_matches'],
          }),
        ]);
      }

      return data;
    },
    onError: (err) => {
      console.log('🚀 ~ .onError ~ err:', err);
    },
  });
}

export function useCheckSeatAvailability(): UseMutationResult<
  SeatProps | string,
  Error,
  { flightId: string; userId: number; seatLetter: string; seatRow: number }
> {
  const { authAxios } = useContext(FetchContext);

  return useMutation<
    SeatProps | string,
    Error,
    { flightId: string; userId: number; seatLetter: string; seatRow: number }
  >({
    mutationFn: ({ flightId, userId, seatLetter, seatRow }) => {
      if (!authAxios) {
        throw new Error('Axios instance is not available');
      }
      return getSeat(
        {
          flight_id: flightId,
          user_id: userId,
          seat_letter: seatLetter,
          seat_row: seatRow,
        },
        authAxios
      );
    },
  });
}

export function usePatchSeat(user_id: number | null, flight_id: number | null) {
  const { authAxios } = useContext(FetchContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: {
      body: SeatProps;
      params: { seat_id: number };
    }) => {
      if (!authAxios) {
        throw new Error('Axios instance is not available');
      }
      return patchSeat(variables, authAxios);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['getJourney', user_id, flight_id],
      });
      return data;
    },
    onError: (err) => {
      console.log('🚀 ~ usePatchSeat ~ err:', err);
      throw err;
    },
  });
}

export function usePostSeat(user_id: number | null, flight_id: number | null) {
  const { authAxios } = useContext(FetchContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { body: SeatProps }) => {
      if (!authAxios) {
        throw new Error('Axios instance is not available');
      }
      return postSeat(variables, authAxios);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['all_matches'] });
      queryClient.invalidateQueries({ queryKey: ['offers'] });
      queryClient.invalidateQueries({
        queryKey: ['getJourney', user_id, flight_id],
      });
      return data;
    },
    onError: (err) => {
      console.log('🚀 ~ usePostSeat ~ err:', err);
    },
  });
}

export function useDeleteSeat(
  user_id: number | null,
  flight_id: number | null
) {
  const { authAxios } = useContext(FetchContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { seat_id: number }) => {
      if (!authAxios) {
        throw new Error('Axios instance is not available');
      }
      return deleteSeat(params, authAxios);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['all_matches'] });
      queryClient.invalidateQueries({ queryKey: ['offers'] });
      queryClient.invalidateQueries({
        queryKey: ['getJourney', user_id, flight_id],
      });
      return data;
    },
    onError: (err) => {
      console.log('🚀 ~ .onError ~ err:', err);
    },
  });
}
