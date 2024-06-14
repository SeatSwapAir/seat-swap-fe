import { Typography, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';

import { Seat as SeatProps } from '../../lib/types';

export default function Seat({
  seat,
  handleDelete,
}: {
  seat: SeatProps;
  flightNumber: string;
  handleDelete: (id: string) => void;
}) {
  return (
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
  );
}
