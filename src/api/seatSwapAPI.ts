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
