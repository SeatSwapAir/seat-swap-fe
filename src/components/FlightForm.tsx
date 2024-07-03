import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  FlightProps,
  SeatProps,
  LocationProps,
  PositionProps,
} from '../../lib/types';
import SeatForm from './SeatForm';
import SoloFlightPreferencesForm from './SoloFlightPreferencesForm';
import GroupFlightPreferencesForm from './GroupFlightPreferencesForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@mui/material';
import { updateFlightByUserFlightId } from '../api/seatSwapAPI';
export default function FlightForm({
  flight,
  handleSubmitFlightChanges,
}: {
  flight: FlightProps;
  handleSubmitFlightChanges: () => void;
}) {
  const [flightDetails, setFlightDetails] = useState(flight);
  const { flightnumber, seats, preferences } = flightDetails;

  const queryClient = useQueryClient();
  const mutateFlight = useMutation({
    mutationFn: updateFlightByUserFlightId,
    onSuccess: (data) => {
      console.log('🚀 ~ .onSuccess ~ data:', data);
      queryClient.invalidateQueries({ queryKey: ['getFlightsByUser'] });
      handleSubmitFlightChanges();
      return data;
    },
    onError: (err) => {
      console.log('🚀 ~ .onError ~ err:', err);
    },
  });
  const handleUpdateFlight = (): void | FlightProps => {
    if (!flightDetails) return;
    mutateFlight.mutate({
      body: flightDetails,
      params: { user_id: 24, flight_id: Number(flightDetails.id) },
    });
  };

  const handleUpdateSeat = (newSeat: SeatProps): void => {
    if (!flightDetails) return;
    const updatedSeats = flightDetails.seats.map((s) =>
      s.id === newSeat.id ? newSeat : s
    );
    setFlightDetails({ ...flightDetails, seats: updatedSeats });
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

  const handleChangeGroupPreferences = (newGroupPreferences: {
    same_row_pref: boolean;
    side_by_side_pref: boolean;
    neighbouring_row_pref: boolean;
  }) => {
    if (!flightDetails) return;
    const updatedPreferences = {
      ...flightDetails.preferences,
      neighbouringRows: newGroupPreferences.neighbouring_row_pref,
      sameRow: newGroupPreferences.same_row_pref,
      sideBySide: newGroupPreferences.side_by_side_pref,
    };
    setFlightDetails({ ...flightDetails, preferences: updatedPreferences });
  };
  const handleChangeSoloPreferences = (newSoloPreferences: {
    legroom_pref: boolean;
    window_pref: boolean;
    middle_pref: boolean;
    aisle_pref: boolean;
    front_pref: boolean;
    center_pref: boolean;
    back_pref: boolean;
  }) => {
    if (!flightDetails) return;
    const updatedPreferences = {
      ...flightDetails.preferences,
      extraLegroom: newSoloPreferences.legroom_pref,
      window_pref: newSoloPreferences.window_pref,
      middle_pref: newSoloPreferences.middle_pref,
      aisle_pref: newSoloPreferences.aisle_pref,
      front_pref: newSoloPreferences.front_pref,
      center_pref: newSoloPreferences.center_pref,
      back_pref: newSoloPreferences.back_pref,
    };
    setFlightDetails({ ...flightDetails, preferences: updatedPreferences });
  };

  return (
    <>
      {seats.map((seat) => (
        <SeatForm
          key={seat.id}
          seat={seat}
          flightNumber={flightnumber}
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
          handleChangeSoloPreferences={handleChangeSoloPreferences}
          preferences={preferences}
        />
      )}
      {seats.length > 1 && (
        <GroupFlightPreferencesForm
          preferences={preferences}
          handleChangeGroupPreferences={handleChangeGroupPreferences}
        />
      )}
      <Button onClick={handleAddSeat}>Add Seat</Button>
      <Button onClick={() => handleUpdateFlight()}>Submit</Button>
    </>
  );
}
