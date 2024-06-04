import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

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
} from "@mui/material";

import {
  Seat as SeatProps,
  Location,
  Position,
  FlightCardProps,
} from "../../lib/types";

export default function SeatForm({
  seat,
  flightNumber,
  handleUpdateSeat,
  doSeatFormChange,
}: {
  seat: SeatProps;
  flightNumber: string;
  handleUpdateSeat: FlightCardProps["handleUpdateSeat"];
  doSeatFormChange: () => void;
}) {
  const [rowNumber, setRowNumber] = useState(seat.number.slice(0, -1));
  const [seatLetter, setSeatLetter] = useState(seat.number.slice(-1));
  const [location, setLocation] = useState<Location>(seat.location);
  const [position, setPosition] = useState<Position>(seat.position);
  const [legroom, setLegroom] = useState(seat.extraLegroom);

  const rows: Number[] = [];
  const letters: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  for (let i = 0; i < 66; i++) {
    rows.push(i);
  }

  const doRowNumber = (event: SelectChangeEvent<string>) => {
    setRowNumber(event.target.value);
  };

  const doSeatLetter = (event: SelectChangeEvent<string>) => {
    setSeatLetter(event.target.value);
  };

  const doLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value as Location);
  };

  const doPosition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(event.target.value as Position);
  };

  const toggleLegroom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLegroom(event.target.checked);
  };

  const doSubmit = () => {
    const newSeat = {
      number: rowNumber + seatLetter,
      location: location,
      extraLegroom: legroom,
      position: position,
    };
    handleUpdateSeat(newSeat, flightNumber, seat.number);
    doSeatFormChange();
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Row Number</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={rowNumber}
            label="Row Number"
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
          <InputLabel id="demo-simple-select-label">Seat Letter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={seatLetter}
            label="Seat Letter"
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
        <FormLabel id="demo-controlled-radio-buttons-group">Location</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={location}
          onChange={doLocation}
        >
          <FormControlLabel
            value="front"
            control={<Radio />}
            label="Front of plane"
          />
          <FormControlLabel
            value="middle"
            control={<Radio />}
            label="Middle of plane"
          />
          <FormControlLabel
            value="back"
            control={<Radio />}
            label="Back of plane"
          />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          Seat Position
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={position}
          onChange={doPosition}
        >
          <FormControlLabel value="window" control={<Radio />} label="Window" />
          <FormControlLabel value="middle" control={<Radio />} label="Middle" />
          <FormControlLabel value="aisle" control={<Radio />} label="Aisle" />
        </RadioGroup>
      </FormControl>
      <FormControlLabel
        control={<Switch checked={legroom} onChange={toggleLegroom} />}
        label="This seat has extra legroom"
      />

      <Button onClick={doSubmit}>Submit Changes</Button>
    </>
  );
}
