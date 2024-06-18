import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  FlightProps,
  PreferencesProps,
  SeatProps,
  LocationProps,
  PositionProps,
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

  const handleUpdateSeat = (newSeat: SeatProps): void => {
    if (!flightDetails) return;
    const updatedSeats = flightDetails.seats.map((s) =>
      s.id === newSeat.id ? newSeat : s
    );
    setFlightDetails({ ...flightDetails, seats: updatedSeats });
  };

  const handleUpdatePreferences = (newPreferences: PreferencesProps): void => {
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
            number: '1A',
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

  const handleChangeSeatLocation = (id: string, newLocation: LocationProps) => {
    if (!flightDetails) return;
    const updatedSeats = flightDetails.seats.map((s) =>
      s.id === id ? { ...s, location: newLocation } : s
    );
    setFlightDetails({ ...flightDetails, seats: updatedSeats });
  };
  const handleChangeSeatPosition = (id: string, newPosition: PositionProps) => {
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

  const handleChangeLegroomPreferences = (newLegroom: boolean) => {
    if (!flightDetails) return;
    const updatedPreferences = {
      ...flightDetails.preferences,
      extraLegroom: newLegroom,
    };
    setFlightDetails({ ...flightDetails, preferences: updatedPreferences });
  };

  const handleChangePositionPreferences = (newPosition: PositionProps) => {
    if (!flightDetails) return;
    const updatedPreferences = {
      ...flightDetails.preferences,
      position: newPosition,
    };
    setFlightDetails({ ...flightDetails, preferences: updatedPreferences });
  };

  const handleChangeLocationPreferences = (newLocation: LocationProps) => {
    if (!flightDetails) return;
    const updatedPreferences = {
      ...flightDetails.preferences,
      location: newLocation,
    };
    setFlightDetails({ ...flightDetails, preferences: updatedPreferences });
  };

  const handleChangeGroupPreferences = (newGroupPreferences: {
    neighbouringRows: boolean;
    sameRow: boolean;
    sideBySide: boolean;
  }) => {
    if (!flightDetails) return;
    const updatedPreferences = {
      ...flightDetails.preferences,
      neighbouringRows: newGroupPreferences.neighbouringRows,
      sameRow: newGroupPreferences.sameRow,
      sideBySide: newGroupPreferences.sideBySide,
    };
    setFlightDetails({ ...flightDetails, preferences: updatedPreferences });
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
          handleChangeLegroomPreferences={handleChangeLegroomPreferences}
          handleChangePositionPreferences={handleChangePositionPreferences}
          handleChangeLocationPreferences={handleChangeLocationPreferences}
          preferences={preferences}
          handleUpdatePreferences={handleUpdatePreferences}
        />
      )}
      {seats.length > 1 && (
        <GroupFlightPreferencesForm
          preferences={preferences}
          handleChangeGroupPreferences={handleChangeGroupPreferences}
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
