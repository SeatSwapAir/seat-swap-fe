import { Typography } from '@mui/material';

import { SeatProps } from '../../lib/types';

export default function Seat({
  seat,
}: {
  seat: SeatProps;
  flightNumber: string;
}) {
  return (
    <Typography variant='body2'>
      Seat {seat.seat_row}
      {seat.seat_letter} - {seat.location} - {seat.position} -{' '}
      {seat.extraLegroom ? 'Extra Legroom' : 'Standard Legroom'}
    </Typography>
  );
}
