import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FlightProps, Preferences, Seat } from '../../lib/types';
import SeatForm from './SeatForm2';
import SoloFlightPreferencesForm from './SoloFlightPreferences2';
import GroupFlightPreferencesForm from './GroupFlightPreferences2';
import { Button } from '@mui/material';
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

  const handleDeleteSeat = (id: string): void => {
    if (!flightDetails) return;
    const updatedSeats = flightDetails.seats.filter((s) => s.id !== id);
    setFlightDetails({ ...flightDetails, seats: updatedSeats });
  };

  const handleAddSeat = () => {
    setFlightDetails((prevDetails) => {
      if (!prevDetails) return prevDetails;
      return {
        ...prevDetails,
        seats: [
          ...prevDetails?.seats,
          {
            number: '',
            location: '',
            extraLegroom: false,
            position: '',
            id: uuidv4(),
            isEditing: true,
          },
        ],
      };
    });
  };

  return (
    <>
      {seats.map((seat) => (
        <SeatForm
          key={seat.id}
          seat={seat}
          flightNumber={flightNumber}
          handleUpdateSeat={handleUpdateSeat}
          handleDeleteSeat={handleDeleteSeat}
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
      <Button onClick={handleAddSeat}>Add Seat</Button>
    </>
  );
}
