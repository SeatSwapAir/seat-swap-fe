import axios from 'axios';
import {
  FlightProps,
  SideBySideMatchesProps,
  SameRowMatchesProps,
  NeighbouringRowsMatchesProps,
  OffersProps,
  AllMatchesProps,
  SeatProps,
} from '../../lib/types';
import { AxiosInstance } from 'axios';

export const getFlightsByUserId = async (
  user_id: Number,
  authAxios: AxiosInstance | null
): Promise<FlightProps[]> => {
  try {
    const res = await authAxios?.get(`users/${user_id}/flights`);
    return res?.data.flights;
  } catch (err) {
    // Ensure that any error is thrown so that useQuery can handle it
    throw err;
  }
};

export const deleteFlightByUserFlightId = async (
  params: {
    user_id: number;
    flight_id: number;
  },
  authAxios: AxiosInstance | null
): Promise<string | void> => {
  const { user_id, flight_id } = params;
  try {
    const res = await authAxios?.delete(
      `users/${user_id}/flights/${flight_id}`
    );
    if (res?.status === 204) {
      return 'Flight deleted successfully';
    }
  } catch (err) {
    console.error('Error deleting flight:', err);
    throw err;
  }
};

export const updateFlightByUserFlightId = async (
  {
    body,
    params,
  }: {
    body: FlightProps;
    params: { user_id: number; flight_id: number };
  },
  authAxios: AxiosInstance | null
): Promise<FlightProps | void> => {
  try {
    const res = await authAxios?.patch(
      `users/${params.user_id}/flights/${params.flight_id}`,
      body
    );
    if (res?.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.error('Error updating flight:', err);
    throw err;
  }
};

export const getFlightDetails = async (
  {
    flightNumber,
    date,
  }: {
    flightNumber: string;
    date: string | null;
  },
  authAxios: AxiosInstance | null
): Promise<FlightProps> => {
  try {
    const res = await authAxios?.get(`flights/${flightNumber}/date/${date}`);
    return res?.data;
  } catch (err) {
    console.error('Error getting flight details:', err);
    throw err;
  }
};

export const postJourney = async (
  {
    body,
    params,
  }: {
    body: FlightProps;
    params: { user_id: number; flight_id: number };
  },
  authAxios: AxiosInstance | null
): Promise<FlightProps | void> => {
  try {
    const res = await authAxios?.post(
      `users/${params.user_id}/flights/${params.flight_id}`,
      body
    );
    if (res?.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.error('Error adding journey:', err);
    throw err;
  }
};

export const getSideBySideMatches = async (
  {
    flight_id,
    user_id,
  }: {
    flight_id: string;
    user_id: number;
  },
  authAxios: AxiosInstance | null
): Promise<SideBySideMatchesProps> => {
  try {
    const res = await authAxios?.get(
      `matches/side_by_side/user/${user_id}/flight/${flight_id}`
    );
    return res?.data;
  } catch (err) {
    console.error('Error getting matches details:', err);
    throw err;
  }
};

export const getSameRowMatches = async (
  {
    flight_id,
    user_id,
  }: {
    flight_id: string;
    user_id: number;
  },
  authAxios: AxiosInstance | null
): Promise<SameRowMatchesProps> => {
  try {
    const res = await authAxios?.get(
      `matches/same_row/user/${user_id}/flight/${flight_id}`
    );
    return res?.data;
  } catch (err) {
    console.error('Error getting matches details:', err);
    throw err;
  }
};

export const getNeighbouringRowsMatches = async (
  {
    flight_id,
    user_id,
  }: {
    flight_id: string;
    user_id: number;
  },
  authAxios: AxiosInstance | null
): Promise<NeighbouringRowsMatchesProps> => {
  try {
    const res = await authAxios?.get(
      `matches/neighbouring_rows/user/${user_id}/flight/${flight_id}`
    );
    return res?.data;
  } catch (err) {
    console.error('Error getting matches details:', err);
    throw err;
  }
};
export const getMatchStatus = async (
  {
    your_seat_id,
    matched_seat_id,
  }: {
    your_seat_id: number;
    matched_seat_id: number;
  },
  authAxios: AxiosInstance | null
): Promise<{ actions: string[]; swap_id?: number }> => {
  try {
    const res = await authAxios?.get(
      `/swap/yourseat/${your_seat_id}/matched/${matched_seat_id}`
    );
    return res?.data;
  } catch (err) {
    console.error('Error getting match status:', err);
    throw err;
  }
};

export const postSwapRequest = async (
  {
    body,
  }: {
    body: { requester_seat_id: number; respondent_seat_id: number };
  },
  authAxios: AxiosInstance | null
): Promise<{
  requester_seat_id: number;
  respondent_seat_id: number;
  created_at: string;
}> => {
  try {
    const res = await authAxios?.post(`swap`, body);
    return res?.data;
  } catch (err) {
    console.error('Error requesting swap:', err);
    throw err;
  }
};
export const patchSwapRequest = async (
  {
    body,
    params,
  }: {
    body: { action: string };
    params: { swap_id: number };
  },
  authAxios: AxiosInstance | null
): Promise<{
  approved: {
    offered_seat_id: number;
    requested_seat_id: number;
    swap_approval_date: string;
  };
  canceled: [{}];
}> => {
  try {
    const res = await authAxios?.patch(`swap/${params.swap_id}`, body);
    return res?.data;
  } catch (err) {
    console.error('Error requesting swap:', err);
    throw err;
  }
};

export const getOffers = async (
  {
    flight_id,
    user_id,
  }: {
    flight_id: string;
    user_id: number;
  },
  authAxios: AxiosInstance | null
): Promise<OffersProps> => {
  try {
    const res = await authAxios?.get(
      `/user/${user_id}/flight/${flight_id}/offers`
    );
    return res?.data;
  } catch (err) {
    console.error('Error getting offers details:', err);
    throw err;
  }
};

export const getAllSeats = async (
  {
    flight_id,
    user_id,
  }: {
    flight_id: string;
    user_id: number;
  },
  authAxios: AxiosInstance | null
): Promise<AllMatchesProps> => {
  try {
    const res = await authAxios?.get(
      `matches/all/user/${user_id}/flight/${flight_id}`
    );
    return res?.data;
  } catch (err) {
    console.error('Error getting matches details:', err);
    throw err;
  }
};

export const getSeat = async (
  {
    flight_id,
    user_id,
    seat_letter,
    seat_row,
  }: {
    flight_id: string;
    user_id: number;
    seat_letter: string;
    seat_row: number;
  },
  authAxios: AxiosInstance | null
): Promise<SeatProps | string> => {
  try {
    const res = await authAxios?.get(
      `users/${user_id}/flights/${flight_id}/seats/${seat_letter}/${seat_row}`
    );
    return res?.data;
  } catch (err) {
    console.error('Error getting seat details:', err);
    throw err;
  }
};

export const getJourney = async (
  {
    user_id,
    flight_id,
  }: {
    user_id: number;
    flight_id: string;
  },
  authAxios: AxiosInstance | null
): Promise<FlightProps> => {
  // console.log('🚀 ~ flight_id:', flight_id);
  // console.log('🚀 ~ user_id:', user_id);

  try {
    const res = await authAxios?.get(`users/${user_id}/flights/${flight_id}`);
    return res?.data;
  } catch (err) {
    // Ensure that any error is thrown so that useQuery can handle it
    throw err;
  }
};

export const patchSeat = async (
  {
    body,
    params,
  }: {
    body: SeatProps;
    params: { seat_id: number };
  },
  authAxios: AxiosInstance | null
): Promise<{
  seat: SeatProps;
}> => {
  console.log('🚀 ~ body:', body);
  console.log('🚀 ~ params:', params);

  try {
    const res = await authAxios?.patch(`seats/${params.seat_id}`, body);
    return res?.data;
  } catch (err) {
    throw err;
  }
};

export const postSeat = async (
  {
    body,
  }: {
    body: SeatProps;
  },
  authAxios: AxiosInstance | null
): Promise<SeatProps | void> => {
  try {
    const res = await authAxios?.post(`seats`, body);
    return res?.data;
  } catch (err) {
    console.error('Error adding seat:', err);
    throw err;
  }
};

export const deleteSeat = async (
  params: {
    seat_id: number;
  },
  authAxios: AxiosInstance | null
): Promise<string | void> => {
  const { seat_id } = params;
  try {
    const res = await authAxios?.delete(`seats/${seat_id}`);
    if (res?.status === 204) {
      return 'Seat deleted successfully';
    }
  } catch (err) {
    console.error('Error deleting seat:', err);
    throw err;
  }
};
