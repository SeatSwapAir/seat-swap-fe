import { MouseEventHandler, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCheckSeatAvailability } from '@/hooks/mutations';

import SeatCard from './SeatCard';

import { useLocation } from 'react-router-dom';

import { FlightProps, SeatProps } from '../../lib/types';

import { usePostJourney } from '@/hooks/mutations';
import axios from 'axios';
import FlightInfo from './FlightInfo';
import AddSeatForm from './AddSeatForm';
import EditSeatForm from './EditSeatForm';
import { Separator } from '@/components/ui/separator';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useNavigate } from 'react-router-dom';

export default function AddJourney() {
  const [seats, setSeats] = useState<SeatProps[]>([]);

  const location = useLocation();
  const flight = location.state?.flight as FlightProps;

  if (!flight) {
    return <div>No flight details available</div>;
  }

  const [seat, setSeat] = useState<SeatProps | null>(null);
  const [showEditSeatForm, setShowEditSeatForm] = useState(false);
  const [showAddSeatForm, setShowAddSeatForm] = useState(false);
  const [seatError, setSeatError] = useState<string | null>(null);

  const navigate = useNavigate();

  const mutateAddJourney = usePostJourney();

  console.log(
    '🚀 ~ AddJourney ~ mutateAddJourney:',
    mutateAddJourney.error?.message
  );

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

  const cancelButton = (
    func: MouseEventHandler<HTMLButtonElement>
  ): JSX.Element => {
    return (
      <div className='flex justify-start ml-4'>
        <Button className='w-[330px]' onClick={func}>
          Cancel
        </Button>
      </div>
    );
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
      navigate('/journey', { state: { user_id: 21, flight_id: flight.id } });
    }
  }, [mutateAddJourney.isSuccess, setShowEditSeatForm]);

  useEffect(() => {
    if (mutateAddJourney.isError) {
      if (axios.isAxiosError(mutateAddJourney.error)) {
        setSeatError(
          mutateAddJourney.error.response?.data?.msg || 'An error occurred'
        );
      }
    }
  }, [mutateAddJourney.isError]);

  return (
    <div className='grid-flow-row'>
      <div className='grid justify-items-center'>
        <h3 className='text-3xl py-6'>Add seats and submit!</h3>
        <div className='grid lg:flex lg:flex-row lg:w-[1000px] justify-center'>
          <div className='min-w-[45%]'>
            <CardHeader className='mt-4'>
              <CardTitle>Heres your flight!</CardTitle>
              <CardDescription>
                Submit your journey after adding all seats
              </CardDescription>
            </CardHeader>
            {flight && <FlightInfo flight={flight} />}
            <Separator orientation='horizontal' />
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
              ))}{' '}
            <Button
              className='my-4'
              disabled={!seats.length}
              onClick={() => handleAddJourney()}
            >
              Submit your journey!
            </Button>
          </div>
          <Separator
            className='my-4 lg:my-0 lg:mx-[50px] lg:h-auto lg:w-px max-w-[450px]'
            orientation='horizontal'
          />
          <div className='min-w-[45%] m-auto'>
            {!showAddSeatForm && !showEditSeatForm && (
              <>
                {seats.length === 0 && (
                  <CardHeader>
                    <CardTitle>Add your seats!</CardTitle>
                    <CardDescription>
                      You cannot submit journey before adding all of your seats
                    </CardDescription>
                  </CardHeader>
                )}
                <Button
                  onClick={() => {
                    setShowAddSeatForm(true);
                  }}
                >
                  Add Seat
                </Button>
              </>
            )}
            {showAddSeatForm && (
              <>
                <AddSeatForm handleAddSeat={handleAddSeat} />
                {cancelButton(() => setShowAddSeatForm(false))}
              </>
            )}
            {showEditSeatForm && seat && (
              <>
                <EditSeatForm seatToEdit={seat} key={seat.id} />
                {cancelButton(() => setShowEditSeatForm(false))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
