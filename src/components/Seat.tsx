import { useState } from 'react';

import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Seat as SeatProps } from '../../lib/types';
import { FlightCardProps } from '../../lib/types';

export default function Seat({
  seat,
  handleDelete,
}: {
  seat: SeatProps;
  handleDelete: FlightCardProps['handleDelete'];
}) {
  const [showEditSeat, setShowEditSeat] = useState(false);
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
          <DeleteIcon />
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setShowEditSeat(!showEditSeat)}
        >
          <EditIcon />
          Edit Seats
        </Button>
      </Typography>
      {showEditSeat && 'Edit seat here'}
    </>
  );
}
