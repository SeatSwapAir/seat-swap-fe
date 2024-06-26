import axios from "axios";
import { FlightProps } from "../../lib/types";

const apiUrl = axios.create({
  baseURL: "http://localhost:9090/api",
});

export const getFlightsByUserId = (user_id:Number):Promise<FlightProps[]> => {
  return apiUrl
  .get(`users/${user_id}/flights`)
  .then((res) => {
    return res.data.flights;
  })
  .catch((err) => console.log(err));
};

export const deleteFlightByUserFlightId = (user_flight_id:Number):Promise<{msg:String} | void> => {
    return apiUrl
    .delete(`flights/${user_flight_id}`)
    .then((res) => {
        console.log("🚀 ~ .then ~ res:", res)
        // if (res.status !== 204) {
        //     return res?.msg
        // }
    })
}