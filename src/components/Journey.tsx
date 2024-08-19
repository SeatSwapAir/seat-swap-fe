import { MouseEventHandler, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCheckSeatAvailability } from '@/hooks/mutations';

import SeatCard from './SeatCard';

import { useLocation } from 'react-router-dom';

import { FlightProps, MatchProps, SeatProps } from '../../lib/types';

import { usePostJourney } from '@/hooks/mutations';
import axios from 'axios';
import FlightInfo from './FlightInfo';
import AddSeatForm from './AddSeatForm';
import EditSeatForm from './EditSeatForm';
import Offers from './Offers';
import Requests from './Requests';
import { Separator } from '@/components/ui/separator';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useJourney } from '@/hooks/queries';
import { usePatchJourney } from '@/hooks/mutations';
import { useAllSeats } from '@/hooks/queries';
import FilterMatches from './FilterMatches';

export default function Journey() {
  const [seats, setSeats] = useState<SeatProps[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  const flight_id = location.state?.flight_id as string;
  const user_id = location.state?.user_id as number;

  const FindJourneyQuery = useJourney(user_id, flight_id);

  const mutateUpdateJourney = usePatchJourney();

  const journey = {
    id: FindJourneyQuery.data?.id,
    airline: FindJourneyQuery.data?.airline,
    arrivalairport: FindJourneyQuery.data?.arrivalairport,
    arrivalairportname: FindJourneyQuery.data?.arrivalairportname,
    arrivaltime: FindJourneyQuery.data?.arrivaltime,
    departureairport: FindJourneyQuery.data?.departureairport,
    departureairportname: FindJourneyQuery.data?.departureairportname,
    departuretime: FindJourneyQuery.data?.departuretime,
    flightnumber: FindJourneyQuery.data?.flightnumber,
    seats: seats,
  };

  //   if (!flight) {
  //     return <div>No flight details available</div>;
  //   }

  const [seat, setSeat] = useState<SeatProps | null>(null);
  const [showEditSeatForm, setShowEditSeatForm] = useState(false);
  const [showAddSeatForm, setShowAddSeatForm] = useState(false);
  const [seatError, setSeatError] = useState<string | null>(null);

  const transformMatches = (matches: MatchProps[] | undefined) => {
    if (!matches) return;
    return matches.flatMap((seat) =>
      seat.offer_seats.map((offer_seat) => [seat.current_seats, offer_seat])
    );
  };

  const all_seats = useAllSeats(21, flight_id);
  const all_seats_formatted = transformMatches(all_seats.data?.all_matches);

  const seatsSwapped = seats.filter((seat) => seat.previous_user_id !== null);

  const handleEditSeat = (seat: SeatProps) => {
    setSeat(seat);
    setShowEditSeatForm(true);
  };

  const handleUpdateSeat = (seat: SeatProps) => {
    if (!seat || !FindJourneyQuery.data) return;
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
    if (!seat || !FindJourneyQuery.data) return;

    const { seat_row, seat_letter } = seat;
    if (!seat_row || !seat_letter) return;
    try {
      await checkSeatAvailability.mutateAsync({
        flightId: flight_id,
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

  const handleUpdateJourney = (): void | FlightProps => {
    if (!FindJourneyQuery.data) return;
    mutateUpdateJourney.mutate({
      body: { ...FindJourneyQuery.data, seats },
      params: { user_id: 21, flight_id: Number(flight_id) },
    });
  };

  useEffect(() => {
    if (FindJourneyQuery.isLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      if (FindJourneyQuery.data && FindJourneyQuery.data.seats) {
        setSeats(FindJourneyQuery.data.seats);
      }
    }
  }, [FindJourneyQuery.data, FindJourneyQuery.isLoading]);

  useEffect(() => {
    if (mutateUpdateJourney.isSuccess) {
      // setSeats(mutateUpdateJourney.data.seats)
      console.log('🚀 ~ useEffect ~ mutateUpdateJourney:', mutateUpdateJourney);
      setShowEditSeatForm(false);
    }
  }, [mutateUpdateJourney.isSuccess, setShowEditSeatForm]);

  useEffect(() => {
    if (mutateUpdateJourney.isError) {
      if (axios.isAxiosError(mutateUpdateJourney.error)) {
        setSeatError(
          mutateUpdateJourney.error.response?.data?.msg || 'An error occurred'
        );
      }
    }
  }, [mutateUpdateJourney.isError]);

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
            {FindJourneyQuery?.data && (
              <FlightInfo flight={FindJourneyQuery.data} />
            )}
            <Separator orientation='horizontal' />
            {seatError && <div>{seatError}</div>}
            {isLoading ? (
              <div>Loading seats...</div>
            ) : (
              seats.length > 0 &&
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
              ))
            )}
            <Button
              onClick={() => {
                setShowAddSeatForm(true);
              }}
            >
              Add Seat
            </Button>

            <Button
              className='my-4'
              disabled={seatsSwapped.length > 0}
              //   onClick={() => handleAddJourney()}
            >
              Delete Flight
            </Button>
            <Button onClick={() => handleUpdateJourney()}>
              Submit Changes
            </Button>
            <>
              <CardHeader>
                <CardTitle>Offered seats!</CardTitle>
                <CardDescription>
                  Check out the seats that you have been offered to swap with
                </CardDescription>
              </CardHeader>
              <Offers user_id={21} flight_id={flight_id} />
            </>
            <>
              <CardHeader>
                <CardTitle>Requested seats!</CardTitle>
                <CardDescription>
                  Check out the seats that you have requested to swap with
                </CardDescription>
              </CardHeader>
              <Requests user_id={21} flight_id={flight_id} />
            </>
          </div>
          <Separator
            className='my-4 lg:my-0 lg:mx-[50px] lg:h-auto lg:w-px max-w-[450px]'
            orientation='horizontal'
          />
          <div className='min-w-[45%] m-auto'>
            {!showAddSeatForm && !showEditSeatForm && (
              <>
                <CardHeader>
                  <CardTitle>Request seats!</CardTitle>
                  <CardDescription>
                    Use the filter below to help you choose a seat to swap with
                  </CardDescription>
                </CardHeader>
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
                <EditSeatForm
                  handleUpdateSeat={handleUpdateSeat}
                  seatToEdit={seat}
                  key={seat.id}
                />
                {cancelButton(() => setShowEditSeatForm(false))}
              </>
            )}
            {all_seats.isSuccess && (
              <FilterMatches allMatches={all_seats_formatted} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
