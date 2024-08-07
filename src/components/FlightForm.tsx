import { useState, useEffect } from 'react';
import {
  FlightProps,
  SeatProps,
  LocationProps,
  PositionProps,
} from '../../lib/types';
import SeatForm from './SeatForm';
import { Typography } from '@mui/material';
import { Button } from '@/components/ui/button';
import { usePostJourney, usePatchJourney } from '../hooks/mutations';
import axios from 'axios';

import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function FlightForm({
  flight,
  setIsEditing,
}: {
  flight: FlightProps;
  setIsEditing: (isEditing: boolean) => void;
}) {
  const [isAddingJourney, setIsAddingJourney] = useState(false);
  if (flight.seats === undefined) {
    flight = {
      ...flight,
      seats: [],
    };
    if (isAddingJourney === false) {
      setIsAddingJourney(true);
    }
  }
  const [flightDetails, setFlightDetails] = useState(flight);
  const { flightnumber, seats } = flightDetails;

  const mutateAddJourney = usePostJourney();
  const mutateUpdateJourney = usePatchJourney();

  useEffect(() => {
    if (mutateAddJourney.isSuccess || mutateUpdateJourney.isSuccess) {
      console.log('here');
      setIsEditing(false);
    }
  }, [mutateAddJourney.isSuccess, mutateUpdateJourney.isSuccess, setIsEditing]);

  const handleAddJourney = (): void | FlightProps => {
    if (!flightDetails) return;
    mutateAddJourney.mutate({
      body: flightDetails,
      params: { user_id: 21, flight_id: Number(flightDetails.id) },
    });
  };

  const handleUpdateJourney = (): void | FlightProps => {
    if (!flightDetails) return;
    mutateUpdateJourney.mutate({
      body: flightDetails,
      params: { user_id: 21, flight_id: Number(flightDetails.id) },
    });
  };

  const handleUpdateSeat = (newSeat: SeatProps): void => {
    if (!flightDetails) return;
    const updatedSeats = flightDetails.seats.map((s) =>
      s.id === newSeat.id ? newSeat : s
    );
    setFlightDetails({ ...flightDetails, seats: updatedSeats });
  };

  const handleDeleteSeat = (id: number): void => {
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
            seat_letter: null,
            seat_row: null,
            location: '',
            extraLegroom: null,
            position: '',
            id: Math.floor(Math.random() * 1000000000),
            previous_user_name: null,
            previous_user_id: null,
            isEditing: true,
          },
        ],
      };
    });
  };

  const handleChangeSeatRowNumber = (id: number, newRow: number) => {
    if (!flightDetails) return;
    const updatedSeats = flightDetails.seats.map((seat) =>
      seat.id === id ? { ...seat, seat_row: newRow } : seat
    );
    setFlightDetails({ ...flightDetails, seats: updatedSeats });
  };

  const handleChangeSeatLetter = (id: number, newLetter: string) => {
    if (!flightDetails) return;
    const updatedSeats = flightDetails.seats.map((seat) =>
      seat.id === id ? { ...seat, seat_letter: newLetter } : seat
    );
    setFlightDetails({ ...flightDetails, seats: updatedSeats });
  };

  const handleChangeSeatLocation = (id: number, newLocation: LocationProps) => {
    if (!flightDetails) return;
    const updatedSeats = flightDetails.seats.map((s) =>
      s.id === id ? { ...s, location: newLocation } : s
    );

    setFlightDetails({ ...flightDetails, seats: updatedSeats });
  };
  const handleChangeSeatPosition = (id: number, newPosition: PositionProps) => {
    if (!flightDetails) return;
    const updatedSeats = flightDetails.seats.map((s) =>
      s.id === id ? { ...s, position: newPosition } : s
    );
    setFlightDetails({ ...flightDetails, seats: updatedSeats });
  };

  const handleChangeSeatLegroom = (id: number, newLegroom: boolean) => {
    if (!flightDetails) return;
    const updatedSeats = flightDetails.seats.map((s) =>
      s.id === id ? { ...s, extraLegroom: newLegroom } : s
    );
    setFlightDetails({ ...flightDetails, seats: updatedSeats });
  };

  return (
    <>
      {mutateUpdateJourney.isPending && <div>loading...</div>}
      {mutateUpdateJourney.isError &&
        axios.isAxiosError(mutateUpdateJourney.error) && (
          <Typography variant='body1' color='error'>
            {mutateUpdateJourney.error.response?.data?.msg ||
              mutateUpdateJourney.error.message}
          </Typography>
        )}
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
      <div className='flex justify-center mt-4'>
        <Button onClick={handleAddSeat}>
          <AddCircleIcon className='mr-2' /> Add Seat
        </Button>
      </div>
      {isAddingJourney && (
        <div className='flex justify-center mt-4 gap-2'>
          <Button variant={'outline'} onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleAddJourney()}>Submit</Button>
        </div>
      )}
      {!isAddingJourney && (
        <div className='flex justify-center mt-4 gap-2'>
          <Button variant={'outline'} onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleUpdateJourney()}>Submit</Button>
        </div>
      )}
    </>
  );
}
