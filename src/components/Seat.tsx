import { useState } from 'react';

import { Typography, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import { FlightCardProps, Seat as SeatProps } from '../../lib/types';

import SeatForm from './SeatForm';

export default function Seat({
  seat,
  flightNumber,
  handleDelete,
  handleUpdateSeat,
}: {
  seatIndex: string;
  seat: SeatProps;
  flightNumber: string;
  handleUpdateSeat: FlightCardProps['handleUpdateSeat'];
  handleDelete: FlightCardProps['handleDelete'];
}) {
  const [showEditSeat, setShowEditSeat] = useState(false);

  const doSeatFormChange = () => {
    setShowEditSeat(false);
  };
  return (
    <>
      <Typography variant='body2'>
        Seat {seat.number} - {seat.location} - {seat.position} -{' '}
        {seat.extraLegroom ? 'Extra Legroom' : 'Standard Legroom'}
        <Button
          variant='contained'
          color='primary'
          onClick={handleDelete}
          value={seat.number}
        >
          <Delete />
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setShowEditSeat(true)}
        >
          <Edit />
          Edit Seats
        </Button>
      </Typography>
      {showEditSeat && (
        <SeatForm
          seat={seat}
          flightNumber={flightNumber}
          handleUpdateSeat={handleUpdateSeat}
          doSeatFormChange={doSeatFormChange}
        />
      )}
    </>
  );
}
