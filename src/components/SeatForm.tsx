import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Switch,
  Button,
} from '@mui/material';

import { SeatProps, LocationProps, PositionProps } from '../../lib/types';

export default function SeatForm({
  seat,
  handleDeleteSeat,
  handleChangeSeatRowNumber,
  handleChangeSeatLetter,
  handleChangeSeatLocation,
  handleChangeSeatPosition,
  handleChangeSeatLegroom,
}: {
  seat: SeatProps;
  flightNumber: string;
  handleUpdateSeat: (newSeat: SeatProps) => void;
  handleDeleteSeat: (id: string) => void;
  handleChangeSeatRowNumber: (id: string, newNumber: string) => void;
  handleChangeSeatLetter: (id: string, newLetter: string) => void;
  handleChangeSeatLocation: (id: string, newLocation: LocationProps) => void;
  handleChangeSeatPosition: (id: string, newPosition: PositionProps) => void;
  handleChangeSeatLegroom: (id: string, newLegroom: boolean) => void;
}) {
  const rows: Number[] = [];
  const letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  for (let i = 0; i < 66; i++) {
    rows.push(i);
  }

  const doRowNumber = (event: SelectChangeEvent<string>) => {
    handleChangeSeatRowNumber(seat.id, event.target.value);
  };

  const doSeatLetter = (event: SelectChangeEvent<string>) => {
    handleChangeSeatLetter(seat.id, event.target.value);
  };

  const doLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLocation = event.target.value as LocationProps;
    handleChangeSeatLocation(seat.id, newLocation);
  };

  const doPosition = (event: React.ChangeEvent<HTMLInputElement>) => {
    const position = event.target.value as PositionProps;
    handleChangeSeatPosition(seat.id, position);
  };

  const toggleLegroom = (event: React.ChangeEvent<HTMLInputElement>) => {
    const legroom = event.target.checked;
    handleChangeSeatLegroom(seat.id, legroom);
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Row Number</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={seat.number.slice(0, -1)}
            label='Row Number'
            onChange={doRowNumber}
          >
            {rows.map((row) => (
              <MenuItem key={row.toString()} value={row.toString()}>
                {row.toString()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Seat Letter</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={seat.number.slice(-1)}
            label='Seat Letter'
            onChange={doSeatLetter}
          >
            {letters.map((letter) => (
              <MenuItem key={letter} value={letter}>
                {letter}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <FormControl>
        <FormLabel id='demo-controlled-radio-buttons-group'>Location</FormLabel>
        <RadioGroup
          aria-labelledby='demo-controlled-radio-buttons-group'
          name='controlled-radio-buttons-group'
          value={seat.location}
          onChange={doLocation}
        >
          <FormControlLabel
            value='front'
            control={<Radio />}
            label='Front of plane'
          />
          <FormControlLabel
            value='center'
            control={<Radio />}
            label='Center of plane'
          />
          <FormControlLabel
            value='back'
            control={<Radio />}
            label='Back of plane'
          />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id='demo-controlled-radio-buttons-group'>
          Seat Position
        </FormLabel>
        <RadioGroup
          aria-labelledby='demo-controlled-radio-buttons-group'
          name='controlled-radio-buttons-group'
          value={seat.position}
          onChange={doPosition}
        >
          <FormControlLabel value='window' control={<Radio />} label='Window' />
          <FormControlLabel value='middle' control={<Radio />} label='Middle' />
          <FormControlLabel value='aisle' control={<Radio />} label='Aisle' />
        </RadioGroup>
      </FormControl>
      <FormControlLabel
        control={
          <Switch checked={seat.extraLegroom} onChange={toggleLegroom} />
        }
        label='This seat has extra legroom'
      />
      <Button onClick={() => handleDeleteSeat(seat.id)}>Delete</Button>
    </>
  );
}
