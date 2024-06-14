import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  FlightProps,
  Preferences,
  Seat,
  Location,
  Position,
} from '../../lib/types';
import SeatForm from './SeatForm2';
import SoloFlightPreferencesForm from './SoloFlightPreferences2';
import GroupFlightPreferencesForm from './GroupFlightPreferences2';
import { Button } from '@mui/material';
export default function FlightForm({
  flight,
  handleSubmitFlightChanges,
}: {
  flight: FlightProps;
  handleSubmitFlightChanges: (flightDetails: FlightProps) => void;
}) {
  const [flightDetails, setFlightDetails] = useState(flight);

  const { flightNumber, seats, preferences } = flightDetails;

  const handleUpdateSeat = (newSeat: Seat): void => {
    if (!flightDetails) return;
    const updatedSeats = flightDetails.seats.map((s) =>
      s.id === newSeat.id ? newSeat : s
    );
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
    //look wy we dont add preference here
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

  const handleChangeSeatRowNumber = (id: string, newNumber: string) => {
    if (!flightDetails) return;
    const updatedSeats = flightDetails.seats.map((s) =>
      s.id === id ? { ...s, number: newNumber + s.number.slice(-1) } : s
    );
    setFlightDetails({ ...flightDetails, seats: updatedSeats });
  };

  const handleChangeSeatLetter = (id: string, newLetter: string) => {
    if (!flightDetails) return;
    const updatedSeats = flightDetails.seats.map((s) =>
      s.id === id ? { ...s, number: s.number.slice(0, 1) + newLetter } : s
    );
    setFlightDetails({ ...flightDetails, seats: updatedSeats });
  };

  const handleChangeSeatLocation = (id: string, newLocation: Location) => {
    if (!flightDetails) return;
    const updatedSeats = flightDetails.seats.map((s) =>
      s.id === id ? { ...s, location: newLocation } : s
    );
    setFlightDetails({ ...flightDetails, seats: updatedSeats });
  };
  const handleChangeSeatPosition = (id: string, newPosition: Position) => {
    if (!flightDetails) return;
    const updatedSeats = flightDetails.seats.map((s) =>
      s.id === id ? { ...s, position: newPosition } : s
    );
    setFlightDetails({ ...flightDetails, seats: updatedSeats });
  };

  const handleChangeSeatLegroom = (id: string, newLegroom: boolean) => {
    if (!flightDetails) return;
    const updatedSeats = flightDetails.seats.map((s) =>
      s.id === id ? { ...s, extraLegroom: newLegroom } : s
    );
    setFlightDetails({ ...flightDetails, seats: updatedSeats });
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
          handleChangeSeatRowNumber={handleChangeSeatRowNumber}
          handleChangeSeatLetter={handleChangeSeatLetter}
          handleChangeSeatLocation={handleChangeSeatLocation}
          handleChangeSeatPosition={handleChangeSeatPosition}
          handleChangeSeatLegroom={handleChangeSeatLegroom}
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
      <Button onClick={() => handleSubmitFlightChanges(flightDetails)}>
        Submit
      </Button>
    </>
  );
}
