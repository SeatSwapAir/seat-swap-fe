import { TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

export default function AddFlight() {
  const [open, setOpen] = useState(false);
  const [flightNumber, setFlightNumber] = useState('');

  const findFlightDetails = () => {
    console.log('backend request to find flight details');
  };
  if (!open)
    return (
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        <AddIcon /> Add Flight
      </Button>
    );

  return (
    <>
      <TextField
        InputLabelProps={{ shrink: true }}
        id='outlined-controlled'
        label='Flight Number'
        value={flightNumber}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setFlightNumber(event.target.value);
        }}
      />
      <Button onClick={findFlightDetails}>Find flight Details</Button>
      <Button
        onClick={() => {
          setOpen(false);
        }}
      >
        <CloseIcon /> Cancel
      </Button>
    </>
  );
}
