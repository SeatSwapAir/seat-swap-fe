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

export function useOptimisticDeleteFlight() {
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
        queryClient.setQueryData(['getFlightsByUser'], context.previousFlights);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getFlightsByUser'] });
    },
  });
}

export function usePostJourney() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postJourney,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['getFlightsByUser'] });
      return data;
    },
    onError: (err) => {
      console.log('🚀 ~ .onError ~ err:', err);
    },
  });
}

export function usePatchJourney() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFlightByUserFlightId,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['getFlightsByUser'] });
      return data;
    },
    onError: (err) => {
      throw err;
    },
  });
}

export function usePostSwapRequest(
  your_seat_id: number,
  matched_seat_id: number
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postSwapRequest,
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
      console.log('🚀 ~ .onError ~ err:', err);
    },
  });
}
export function usePatchSwapRequest(
  your_seat_id: number,
  matched_seat_id: number
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchSwapRequest,
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
  return useMutation<
    SeatProps | string,
    Error,
    { flightId: string; userId: number; seatLetter: string; seatRow: number }
  >({
    mutationFn: ({ flightId, userId, seatLetter, seatRow }) =>
      getSeat({
        flight_id: flightId,
        user_id: userId,
        seat_letter: seatLetter,
        seat_row: seatRow,
      }),
  });
}

export function usePatchSeat(user_id: number | null, flight_id: number | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchSeat,
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postSeat,
    onSuccess: (data) => {
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

export function useDeleteSeat(
  user_id: number | null,
  flight_id: number | null
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSeat,
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
