import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCheckSeatAvailability } from '@/hooks/mutations';

import {
  FlightProps,
  SeatProps,
  LocationProps,
  PositionProps,
} from '../../lib/types';

import AircraftSeatAisle from '@/components/ui/icons/AircraftSeatAisle';
import AircraftSeatMiddle from '@/components/ui/icons/AircraftSeatMiddle';
import AircraftSeatWindow from '@/components/ui/icons/AircraftSeatWindow';
import AircraftSeatExtraLegroom from '@/components/ui/icons/AircraftSeatExtraLegroom';
import AircraftSeatReducedLegroom from '@/components/ui/icons/AircraftSeatReducedLegroom';
import AircraftFrontSection from '@/components/ui/icons/AircraftFrontSection';
import AircraftCenterSection from '@/components/ui/icons/AircraftCenterSection';
import AircraftBackSection from '@/components/ui/icons/AircraftBackSection';
import Timeline from '@/components/ui/icons/Timeline';
import SeatForm2 from './SeatForm2';
import { usePostJourney } from '@/hooks/mutations';
import axios from 'axios';
import FlightInfo from './FlightInfo';

export default function AddJourney({ flight }: { flight: FlightProps | null }) {
  const [seats, setSeats] = useState<SeatProps[]>([]);
  const newSeat = {
    id: Math.floor(Math.random() * 1000000000),
    location: '' as LocationProps,
    position: '' as PositionProps,
    seat_letter: null,
    seat_row: null,
    previous_user_name: null,
    previous_user_id: null,
  };
  const [seat, setSeat] = useState<SeatProps | null>(newSeat);

  const [showSeatForm, setShowSeatForm] = useState(true);

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

  const handleDeleteSeat = (seat: SeatProps): void => {
    if (!seat.seat_row || !seat.seat_letter) return;
    const updatedSeats = seats.filter(
      (s) => s.seat_row !== seat.seat_row && s.seat_letter !== seat.seat_letter
    );
    setSeats(updatedSeats);
  };

  const handleChangeSeatRowNumber = (newRowNumber: number) => {
    if (!seat) return;
    setSeat({ ...seat, seat_row: newRowNumber });
  };

  const handleChangeSeatLetter = (newLetter: string) => {
    if (!seat) return;
    setSeat({ ...seat, seat_letter: newLetter });
  };

  const handleChangeSeatLocation = (newLocation: LocationProps) => {
    if (!seat) return;
    setSeat({ ...seat, location: newLocation });
  };

  const handleChangeSeatPosition = (newPosition: PositionProps) => {
    if (!seat) return;
    setSeat({ ...seat, position: newPosition });
  };

  const handleChangeSeatLegroom = (newExtraLegroom: boolean) => {
    if (!seat) return;
    setSeat({ ...seat, extraLegroom: newExtraLegroom });
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
        const seatExist = seats.filter((s) => s.id === seat.id);
        if (seatExist.length === 0) {
          setSeats((prevSeats) => [...prevSeats, seat]);
        } else {
          setSeats((prevSeats) =>
            prevSeats.map((s) => (s.id === seat.id ? seat : s))
          );
        }
        setSeat(newSeat);
        setShowSeatForm(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setSeatError(error.response?.data?.msg || 'An error occurred');
        } else {
          setSeatError('An unexpected error occurred');
        }
      }
    }
  };

  useEffect(() => {
    if (mutateAddJourney.isSuccess) {
      setShowSeatForm(false);
    }
  }, [mutateAddJourney.isSuccess, setShowSeatForm]);

  return (
    <div className='grid justify-items-center'>
      <h2>Add Journey</h2>
      <h4 className='mb-3'>Add seats on flight</h4>
      {flight && <FlightInfo flight={flight} />}
      {seatError && <div>{seatError}</div>}
      {seats.length > 0 &&
        seats.map((seat: SeatProps, index) => (
          <div
            key={
              seat.seat_row !== null && seat.seat_letter !== null
                ? `${seat.seat_row}${seat.seat_letter}`
                : index
            }
            className='flex flex-row p-0 items-center justify-center'
          >
            <div className='mr-3'>
              Seat {seat.seat_row}
              {seat.seat_letter}
            </div>
            <div className='flex items-center p-0 mr-2'>
              Position:{' '}
              {seat.position === 'aisle' ? (
                <AircraftSeatAisle className='w-6 h-6' />
              ) : seat.position === 'middle' ? (
                <AircraftSeatMiddle className='w-6 h-6' />
              ) : (
                <AircraftSeatWindow className='w-6 h-6' />
              )}
            </div>
            <div className='flex items-center p-0 mr-2'>
              Section:{' '}
              {seat.location === 'front' ? (
                <AircraftFrontSection className='w-6 h-6' />
              ) : seat.location === 'center' ? (
                <AircraftCenterSection className='w-6 h-6' />
              ) : (
                <AircraftBackSection className='w-6 h-6' />
              )}
            </div>
            <div className='flex items-center p-0 mr-2'>
              Seat Legroom:{' '}
              {seat.extraLegroom ? (
                <AircraftSeatExtraLegroom className='w-6 h-6' />
              ) : (
                <AircraftSeatReducedLegroom className='w-6 h-6' />
              )}
            </div>
            <Button className='w-7 h-7 mr-1'>
              <EditIcon
                onClick={() => {
                  setShowSeatForm(true);
                  setSeat(seat);
                }}
              />
            </Button>
            <Button className='w-7 h-7' onClick={() => handleDeleteSeat(seat)}>
              <DeleteIcon />
            </Button>
          </div>
        ))}
      {showSeatForm && seat && (
        <SeatForm2
          seat={seat}
          handleChangeSeatRowNumber={handleChangeSeatRowNumber}
          handleChangeSeatLetter={handleChangeSeatLetter}
          handleChangeSeatLocation={handleChangeSeatLocation}
          handleChangeSeatPosition={handleChangeSeatPosition}
          handleChangeSeatLegroom={handleChangeSeatLegroom}
          handleSaveSeat={handleSaveSeat}
        />
      )}
      <Button
        onClick={() => {
          setShowSeatForm(true);
          setSeat(newSeat);
        }}
      >
        Add Seat
      </Button>
      <Button onClick={() => handleAddJourney()}>Submit</Button>
      {/* {showSeatForm && (
        <Button onClick={() => {
            setShowSeatForm(false)

        }}>
          <Close /> Cancel
        </Button>
      )} */}
    </div>
  );
}
