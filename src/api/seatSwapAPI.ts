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

const apiUrl = axios.create({
  baseURL: 'http://localhost:9090/api',
});

export const getFlightsByUserId = async (
  user_id: Number
): Promise<FlightProps[]> => {
  try {
    const res = await apiUrl.get(`users/${user_id}/flights`);
    return res.data.flights;
  } catch (err) {
    // Ensure that any error is thrown so that useQuery can handle it
    throw err;
  }
};

export const deleteFlightByUserFlightId = (params: {
  user_id: number;
  flight_id: number;
}): Promise<string | void> => {
  const { user_id, flight_id } = params;
  return apiUrl
    .delete(`users/${user_id}/flights/${flight_id}`)
    .then((res) => {
      if (res.status === 204) {
        return 'Flight deleted successfully';
      }
    })
    .catch((err) => {
      console.error('Error deleting flight:', err);
      throw err;
    });
};

export const updateFlightByUserFlightId = ({
  body,
  params,
}: {
  body: FlightProps;
  params: { user_id: number; flight_id: number };
}): Promise<FlightProps | void> => {
  return apiUrl
    .patch(`users/${params.user_id}/flights/${params.flight_id}`, body)
    .then((res) => {
      if (res.status === 200) {
        return res?.data;
      }
    })
    .catch((err) => {
      console.error('Error updating flight:', err);
      throw err;
    });
};

export const getFlightDetails = ({
  flightNumber,
  date,
}: {
  flightNumber: string;
  date: string | null;
}): Promise<FlightProps> => {
  return apiUrl
    .get(`flights/${flightNumber}/date/${date}`)
    .then((res) => {
      if (res.status === 200) {
        return res?.data;
      }
    })
    .catch((err) => {
      console.error('Error getting flight details:', err);
      throw err;
    });
};

export const postJourney = ({
  body,
  params,
}: {
  body: FlightProps;
  params: { user_id: number; flight_id: number };
}): Promise<FlightProps | void> => {
  return apiUrl
    .post(`users/${params.user_id}/flights/${params.flight_id}`, body)
    .then((res) => {
      if (res.status === 200) {
        return res?.data;
      }
    })
    .catch((err) => {
      console.error('Error adding journey:', err);
      throw err;
    });
};

export const getSideBySideMatches = ({
  flight_id,
  user_id,
}: {
  flight_id: string;
  user_id: number;
}): Promise<SideBySideMatchesProps> => {
  return apiUrl
    .get(`matches/side_by_side/user/${user_id}/flight/${flight_id}`)
    .then((res) => {
      if (res.status === 200) {
        return res?.data;
      }
    })
    .catch((err) => {
      console.error('Error getting matches details:', err);
      throw err;
    });
};

export const getSameRowMatches = ({
  flight_id,
  user_id,
}: {
  flight_id: string;
  user_id: number;
}): Promise<SameRowMatchesProps> => {
  return apiUrl
    .get(`matches/same_row/user/${user_id}/flight/${flight_id}`)
    .then((res) => {
      if (res.status === 200) {
        return res?.data;
      }
    })
    .catch((err) => {
      console.error('Error getting matches details:', err);
      throw err;
    });
};

export const getNeighbouringRowsMatches = ({
  flight_id,
  user_id,
}: {
  flight_id: string;
  user_id: number;
}): Promise<NeighbouringRowsMatchesProps> => {
  return apiUrl
    .get(`matches/neighbouring_rows/user/${user_id}/flight/${flight_id}`)
    .then((res) => {
      if (res.status === 200) {
        return res?.data;
      }
    })
    .catch((err) => {
      console.error('Error getting matches details:', err);
      throw err;
    });
};
export const getMatchStatus = ({
  your_seat_id,
  matched_seat_id,
}: {
  your_seat_id: number;
  matched_seat_id: number;
}): Promise<{ actions: string[]; swap_id?: number }> => {
  return apiUrl
    .get(`/swap/yourseat/${your_seat_id}/matched/${matched_seat_id}`)
    .then((res) => {
      if (res.status === 200) {
        return res?.data;
      }
    })
    .catch((err) => {
      console.error('Error getting match status:', err);
      throw err;
    });
};

export const postSwapRequest = ({
  body,
}: {
  body: { requester_seat_id: number; respondent_seat_id: number };
}): Promise<{
  requester_seat_id: number;
  respondent_seat_id: number;
  created_at: string;
}> => {
  // console.log("🚀 ~ body:", body)

  return apiUrl
    .post(`swap`, body)
    .then((res) => {
      if (res.status === 200) {
        return res?.data;
      }
    })
    .catch((err) => {
      console.error('Error requesting swap:', err);
      throw err;
    });
};
export const patchSwapRequest = ({
  body,
  params,
}: {
  body: { action: string };
  params: { swap_id: number };
}): Promise<{
  approved: {
    offered_seat_id: number;
    requested_seat_id: number;
    swap_approval_date: string;
  };
  canceled: [{}];
}> => {
  return apiUrl
    .patch(`swap/${params.swap_id}`, body)
    .then((res) => {
      if (res.status === 200) {
        return res?.data;
      }
    })
    .catch((err) => {
      console.error('Error requesting swap:', err);
      throw err;
    });
};

export const getOffers = ({
  flight_id,
  user_id,
}: {
  flight_id: string;
  user_id: number;
}): Promise<OffersProps> => {
  return apiUrl
    .get(`/user/${user_id}/flight/${flight_id}/offers`)
    .then((res) => {
      if (res.status === 200) {
        return res?.data;
      }
    })
    .catch((err) => {
      console.error('Error getting offers details:', err);
      throw err;
    });
};

export const getAllSeats = ({
  flight_id,
  user_id,
}: {
  flight_id: string;
  user_id: number;
}): Promise<AllMatchesProps> => {
  return apiUrl
    .get(`matches/all/user/${user_id}/flight/${flight_id}`)
    .then((res) => {
      if (res.status === 200) {
        return res?.data;
      }
    })
    .catch((err) => {
      console.error('Error getting matches details:', err);
      throw err;
    });
};

export const getSeat = ({
  flight_id,
  user_id,
  seat_letter,
  seat_row,
}: {
  flight_id: string;
  user_id: number;
  seat_letter: string;
  seat_row: number;
}): Promise<SeatProps | string> => {
  return apiUrl
    .get(
      `users/${user_id}/flights/${flight_id}/seats/${seat_letter}/${seat_row}`
    )
    .then((res) => {
      if (res.status === 200) {
        return res?.data;
      }
      // if (res.status === 400 || res.status === 403) {
      //   return res.data.msg;
      // }
    })
    .catch((err) => {
      console.error('Error getting seat details:', err);
      throw err;
    });
};

export const getJourney = async ({
  user_id,
  flight_id,
}: {
  user_id: number;
  flight_id: string;
}): Promise<FlightProps> => {
  // console.log('🚀 ~ flight_id:', flight_id);
  // console.log('🚀 ~ user_id:', user_id);

  try {
    const res = await apiUrl.get(`users/${user_id}/flights/${flight_id}`);
    return res.data;
  } catch (err) {
    // Ensure that any error is thrown so that useQuery can handle it
    throw err;
  }
};

export const patchSeat = ({
  body,
  params,
}: {
  body: SeatProps;
  params: { seat_id: number };
}): Promise<{
  seat: SeatProps;
}> => {
  console.log('🚀 ~ body:', body);
  console.log('🚀 ~ params:', params);

  return apiUrl
    .patch(`seats/${params.seat_id}`, body)
    .then((res) => {
      if (res.status === 200) {
        return res?.data;
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const postSeat = ({
  body,
}: {
  body: SeatProps;
}): Promise<SeatProps | void> => {
  return apiUrl
    .post(`seats`, body)
    .then((res) => {
      if (res.status === 200) {
        return res?.data;
      }
    })
    .catch((err) => {
      console.error('Error adding seat:', err);
      throw err;
    });
};

export const deleteSeat = (params: {
  seat_id: number;
}): Promise<string | void> => {
  const { seat_id } = params;

  return apiUrl
    .delete(`seats/${seat_id}`)
    .then((res) => {
      if (res.status === 204) {
        return 'Seat deleted successfully';
      }
    })
    .catch((err) => {
      console.error('Error deleting seat:', err);
      throw err;
    });
};
