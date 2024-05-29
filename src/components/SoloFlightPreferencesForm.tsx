import { useState } from "react";
import {
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Button,
  Switch,
} from "@mui/material";

import { Preferences, Location, Position } from "../../lib/types";

export default function SoloFlightPreferencesForm({
  handleUpdatePreferences,
  flightNumber,
  preferences,
}: {
  handleUpdatePreferences: (
    newPreferences: Preferences,
    flightNumber: string
  ) => void;
  flightNumber: string;
  preferences: Preferences;
}) {
  const [location, setLocation] = useState<Location>(preferences.location);
  const [position, setPosition] = useState<Position>(preferences.position);
  const [extraLegroom, setExtraLegroom] = useState(preferences.extraLegroom);

  const doLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value as Location);
  };

  const doPosition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(event.target.value as Position);
  };

  const toggleLegroom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtraLegroom(event.target.checked);
  };

  const doSubmit = () => {
    const newPreferences = {
      location: location as Location,
      extraLegroom: extraLegroom,
      position: position as Position,
      neighbouringRows: false,
      sameRow: false,
      sideBySide: false,
    };

    handleUpdatePreferences(newPreferences, flightNumber);
  };

  return (
    <>
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
        control={<Switch checked={extraLegroom} onChange={toggleLegroom} />}
        label="This seat has extra legroom"
      />
      <Button onClick={doSubmit}>Submit Changes</Button>
    </>
  );
}
