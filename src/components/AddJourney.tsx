import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCheckSeatAvailability } from '@/hooks/mutations';

import SeatCard from './SeatCard';

import { useLocation } from 'react-router-dom';

import {
  FlightProps,
  SeatProps,
  LocationProps,
  PositionProps,
} from '../../lib/types';

import SeatForm2 from './SeatForm2';
import { usePostJourney } from '@/hooks/mutations';
import axios from 'axios';
import FlightInfo from './FlightInfo';
import { Add } from '@mui/icons-material';
import AddSeatForm from './AddSeatForm';
import EditSeatForm from './EditSeatForm';

export default function AddJourney() {
  const [seats, setSeats] = useState<SeatProps[]>([]);
  console.log('🚀 ~ file: AddJourney.tsx:23 ~ AddJourney ~ seats:', seats);
  const newSeat = {
    id: Math.floor(Math.random() * 1000000000),
    location: '' as LocationProps,
    position: '' as PositionProps,
    seat_letter: null,
    seat_row: null,
    previous_user_name: null,
    previous_user_id: null,
  };
  const location = useLocation();
  const flight = location.state?.flight as FlightProps;

  if (!flight) {
    return <div>No flight details available</div>;
  }

  const [seat, setSeat] = useState<SeatProps | null>(newSeat);
  console.log('🚀 ~ seat:', seat);

  const [showEditSeatForm, setShowEditSeatForm] = useState(false);
  const [showAddSeatForm, setShowAddSeatForm] = useState(false);

  const [seatError, setSeatError] = useState<string | null>(null);

  const mutateAddJourney = usePostJourney();

  const handleAddJourney = (): void | FlightProps => {
    if (!flight) return;

    const journey = {
      flightnumber: flight.flightnumber,
      departureairport: flight.departureairport,
      departureairportname: flight.departureairportname,
      arrivalairportname: flight.arrivalairportname,
      arrivalairport: flight.arrivalairport,
      departuretime: flight.departuretime,
      arrivaltime: flight.arrivaltime,
      airline: flight.airline,
      seats: seats,
      id: flight.id,
    };

    mutateAddJourney.mutate({
      body: journey,
      params: { user_id: 21, flight_id: Number(flight.id) },
    });
  };
  const handleEditSeat = (seat: SeatProps) => {
    setSeat(seat);
    setShowEditSeatForm(true);
  };

  const handleUpdateSeat = (seat: SeatProps) => {
    if (!seat || !flight) return;
    setSeats((prevSeats) =>
      prevSeats.map((s) => (s.id === seat.id ? seat : s))
    );
    setShowEditSeatForm(false);
  };

  const handleDeleteSeat = (seat: SeatProps): void => {
    if (!seat.seat_row || !seat.seat_letter) return;
    const updatedSeats = seats.filter(
      (s) =>
        !(s.seat_row === seat.seat_row && s.seat_letter === seat.seat_letter)
    );
    setSeats(updatedSeats);
  };

  const checkSeatAvailability = useCheckSeatAvailability();

  const handleSaveSeat = async () => {
    if (!seat || !flight) return;

    if (seat.seat_letter && seat.seat_row) {
      try {
        await checkSeatAvailability.mutateAsync({
          flightId: flight.id,
          userId: 21,
          seatLetter: seat.seat_letter,
          seatRow: seat.seat_row,
        });
        const seatExist = seats.filter(
          (s) =>
            s.seat_letter === seat.seat_letter && s.seat_row === seat.seat_row
        );
        if (seatExist.length === 0) {
          setSeats((prevSeats) => [...prevSeats, seat]);
        } else {
          setSeats((prevSeats) =>
            prevSeats.map((s) => (s.id === seat.id ? seat : s))
          );
        }
        setSeat(newSeat);
        setShowEditSeatForm(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setSeatError(error.response?.data?.msg || 'An error occurred');
        } else {
          setSeatError('An unexpected error occurred');
        }
      }
    }
  };

  const handleAddSeat = async (seat: SeatProps) => {
    if (!seat || !flight) return;

    const { seat_row, seat_letter } = seat;
    if (!seat_row || !seat_letter) return;
    try {
      await checkSeatAvailability.mutateAsync({
        flightId: flight.id,
        userId: 21,
        seatLetter: seat_letter,
        seatRow: seat_row,
      });
      const doesSeatExist =
        seats.filter(
          (s) => s.seat_row === seat_row && s.seat_letter === seat_letter
        ).length > 0;
      if (doesSeatExist) {
        setSeatError(`Seat ${seat_row}${seat_letter} already exists`);
        return;
      }
      setSeats((prevSeats) => [...prevSeats, seat]);
      setShowAddSeatForm(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSeatError(error.response?.data?.msg || 'An error occurred');
      } else {
        setSeatError('An unexpected error occurred');
      }
    }
  };

  useEffect(() => {
    if (mutateAddJourney.isSuccess) {
      setShowEditSeatForm(false);
    }
  }, [mutateAddJourney.isSuccess, setShowEditSeatForm]);

  return (
    <div className='grid justify-items-center'>
      <h2>Add Journey</h2>
      <h4 className='mb-3'>Add seats on flight</h4>
      {flight && <FlightInfo flight={flight} />}
      {seatError && <div>{seatError}</div>}
      {seats.length > 0 &&
        seats.map((seat: SeatProps, index) => (
          <SeatCard
            key={
              seat.seat_row !== null && seat.seat_letter !== null
                ? `${seat.seat_row}${seat.seat_letter}`
                : index
            }
            seat={seat}
            handleDeleteSeat={handleDeleteSeat}
            handleEditSeat={handleEditSeat}
          />
        ))}

      <Button
        onClick={() => {
          setShowAddSeatForm(true);
        }}
      >
        Add Seat
      </Button>
      {showAddSeatForm && <AddSeatForm handleAddSeat={handleAddSeat} />}
      {showEditSeatForm && seat && (
        <EditSeatForm
          handleUpdateSeat={handleUpdateSeat}
          seatToEdit={seat}
          key={seat.id}
        />
      )}
      <Button onClick={() => handleAddJourney()}>Submit</Button>
    </div>
  );
}
