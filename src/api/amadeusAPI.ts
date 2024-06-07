import axios from 'axios';
import { GetToken, GetFlightDetails, GetAirlineName } from '../../lib/types';

 export const getToken: GetToken  = async () => {
  const bodyParameters = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: import.meta.env.VITE_AMADEUS_API_KEY,
    client_secret: import.meta.env.VITE_AMADEUS_API_SECRET,
  });
  try {
    const response = await axios.post(
      `https://test.api.amadeus.com/v1/security/oauth2/token`,
      bodyParameters,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.log('error', error);
  }
};

export const getFlightDetails: GetFlightDetails = async (carrierCode, flightNumber, scheduledDepartureDate, headers) => {
  try {
    const response = await axios.get(
      `https://test.api.amadeus.com/v2/schedule/flights?carrierCode=${carrierCode}&flightNumber=${flightNumber}&scheduledDepartureDate=${scheduledDepartureDate}`,
      {
        headers,
      }
    );
    const airline = await getAirlineName(carrierCode, headers)
    if(!airline) throw new Error('Failed to retrieve airline name');
    return {
      flightNumber:
        response.data.data[0].flightDesignator.carrierCode +
        response.data.data[0].flightDesignator.flightNumber,
      departureAirport: response.data.data[0].flightPoints[0].iataCode,
      arrivalAirport: response.data.data[0].flightPoints[1].iataCode,
      departureTime:
        response.data.data[0].flightPoints[0].departure.timings[0].value,
      arrivalTime:
        response.data.data[0].flightPoints[1].arrival.timings[0].value,
        airline: airline,
        seats: [],
      preferences: {
        location: '',
        extraLegroom: false,
        position: '',
        neighbouringRows: false,
        sameRow: true,
        sideBySide: false,
      },
    }
  } catch (error) {
    console.log('error', error);
  }
};

export const getAirlineName: GetAirlineName = async (carrierCode, headers) => {
  try {
    const response = await axios.get(
      `https://test.api.amadeus.com/v1/reference-data/airlines?airlineCodes=${carrierCode}`,
      {
        headers,
      }
    );
    return response.data.data[0].commonName
  } catch (error) {
    console.log('error', error);
  }
};