import { Typography, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import {
  FlightCardProps,
  Seat as SeatProps,
  showEditSeat,
} from '../../lib/types';

import SeatForm from './SeatForm';

export default function Seat({
  seat,
  flightNumber,
  handleDelete,
  handleUpdateSeat,
  showEditSeat,
}: {
  seat: SeatProps;
  flightNumber: string;
  handleUpdateSeat: FlightCardProps['handleUpdateSeat'];
  handleDelete: (id: string) => void;
  showEditSeat: showEditSeat;
}) {
  return (
    <>
      {!seat.isEditing && (
        <Typography variant='body2'>
          Seat {seat.number} - {seat.location} - {seat.position} -{' '}
          {seat.extraLegroom ? 'Extra Legroom' : 'Standard Legroom'}
          <Button
            variant='contained'
            color='primary'
            onClick={() => handleDelete(seat.id)}
            value={seat.number}
          >
            <Delete />
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() => showEditSeat(seat.id)}
          >
            <Edit />
            Edit Seats
          </Button>
        </Typography>
      )}
      {seat.isEditing && (
        <SeatForm
          seat={seat}
          flightNumber={flightNumber}
          handleUpdateSeat={handleUpdateSeat}
        />
      )}
    </>
  );
}
