import axios from 'axios';
import { FlightProps } from '../../lib/types';

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
}): Promise<{ msg: string } | void> => {
  const { user_id, flight_id } = params;
  return apiUrl.delete(`users/${user_id}/flights/${flight_id}`).then((res) => {
    console.log('🚀 ~ .then ~ res:', res);
    // if (res.status !== 204) {
    //     return res?.msg
    // }
  });
};

export const updateFlightByUserFlightId = ({
  body,
  params,
}: {
  body: FlightProps;
  params: { user_id: number; flight_id: number };
}): Promise<FlightProps | void> => {
  console.log('🚀 ~ body:', body);

  return apiUrl
    .patch(`users/${params.user_id}/flights/${params.flight_id}`, body)
    .then((res) => {
      // console.log('🚀 ~ .then ~ res:', res);
      if (res.status !== 200) {
        return res?.data;
      }
    });
};
