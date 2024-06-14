import { Typography, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';

import { FlightCardProps, Seat as SeatProps } from '../../lib/types';

import SeatForm from './SeatForm';

export default function Seat({
  seat,
  flightNumber,
  handleDelete,
  handleUpdateSeat,
}: {
  seat: SeatProps;
  flightNumber: string;
  handleUpdateSeat: FlightCardProps['handleUpdateSeat'];
  handleDelete: (id: string) => void;
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
