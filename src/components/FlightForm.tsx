import { useState } from 'react';
import { FlightProps, Preferences, Seat } from '../../lib/types';
import SeatForm from './SeatForm2';
import SoloFlightPreferencesForm from './SoloFlightPreferences2';
import GroupFlightPreferencesForm from './GroupFlightPreferences2';
export default function FlightForm({ flight }: { flight: FlightProps }) {
  const [flightDetails, setFlightDetails] = useState(flight);
  console.log(flightDetails);

  const { flightNumber, seats, preferences } = flightDetails;

  const handleUpdateSeat = (newSeat: Seat): void => {
    if (!flightDetails) return;
    const updatedSeats =
      flightDetails.seats.map((s) => (s.id === newSeat.id ? newSeat : s)) ?? [];
    setFlightDetails({ ...flightDetails, seats: updatedSeats });
  };

  const handleUpdatePreferences = (newPreferences: Preferences): void => {
    if (!flightDetails) return;
    setFlightDetails({ ...flightDetails, preferences: newPreferences });
  };

  return (
    <>
      {seats.map((seat) => (
        <SeatForm
          key={seat.id}
          seat={seat}
          flightNumber={flightNumber}
          handleUpdateSeat={handleUpdateSeat}
        />
      ))}
      {seats.length === 1 && (
        <SoloFlightPreferencesForm
          preferences={preferences}
          handleUpdatePreferences={handleUpdatePreferences}
        />
      )}
      {seats.length > 1 && (
        <GroupFlightPreferencesForm
          preferences={preferences}
          handleUpdatePreferences={handleUpdatePreferences}
        />
      )}
    </>
  );
}
