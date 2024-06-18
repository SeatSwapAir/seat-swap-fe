import { useState } from 'react';
import {
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Button,
  Switch,
} from '@mui/material';

import {
  PreferencesProps,
  LocationProps,
  PositionProps,
} from '../../lib/types';

export default function SoloFlightPreferencesForm({
  handleUpdatePreferences,
  flightNumber,
  preferences,
}: {
  handleUpdatePreferences: (
    newPreferences: PreferencesProps,
    flightNumber: string
  ) => void;
  flightNumber: string;
  preferences: PreferencesProps;
}) {
  const [location, setLocation] = useState<LocationProps>(preferences.location);
  const [position, setPosition] = useState<PositionProps>(preferences.position);
  const [extraLegroom, setExtraLegroom] = useState(preferences.extraLegroom);

  const doLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value as LocationProps);
  };

  const doPosition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(event.target.value as PositionProps);
  };

  const toggleLegroom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtraLegroom(event.target.checked);
  };

  const doSubmit = () => {
    const newPreferences = {
      location: location as LocationProps,
      extraLegroom: extraLegroom,
      position: position as PositionProps,
      neighbouringRows: false,
      sameRow: false,
      sideBySide: false,
    };

    handleUpdatePreferences(newPreferences, flightNumber);
  };

  return (
    <>
      <FormControl>
        <FormLabel id='demo-controlled-radio-buttons-group'>Location</FormLabel>
        <RadioGroup
          aria-labelledby='demo-controlled-radio-buttons-group'
          name='controlled-radio-buttons-group'
          value={location}
          onChange={doLocation}
        >
          <FormControlLabel
            value='front'
            control={<Radio />}
            label='Front of plane'
          />
          <FormControlLabel
            value='middle'
            control={<Radio />}
            label='Middle of plane'
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
          value={position}
          onChange={doPosition}
        >
          <FormControlLabel value='window' control={<Radio />} label='Window' />
          <FormControlLabel value='middle' control={<Radio />} label='Middle' />
          <FormControlLabel value='aisle' control={<Radio />} label='Aisle' />
        </RadioGroup>
      </FormControl>
      <FormControlLabel
        control={<Switch checked={extraLegroom} onChange={toggleLegroom} />}
        label='This seat has extra legroom'
      />
      <Button onClick={doSubmit}>Submit Changes</Button>
    </>
  );
}
