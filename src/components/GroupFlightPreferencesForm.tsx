import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Box,
  Checkbox,
  FormGroup,
  Button,
} from '@mui/material';

import {
  PreferencesProps,
  LocationProps,
  PositionProps,
} from '../../lib/types';

export default function GroupFlightPreferencesForm({
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
  const [groupPreferences, setGroupPreferences] = useState({
    neighbouringRows: preferences.neighbouringRows,
    sameRow: preferences.sameRow,
    sideBySide: preferences.sideBySide,
  });
  const { neighbouringRows, sameRow, sideBySide } = groupPreferences;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupPreferences({
      ...groupPreferences,
      [event.target.name]: event.target.checked,
    });
  };

  const doSubmit = () => {
    const newPreferences = {
      location: '' as LocationProps,
      extraLegroom: false,
      position: '' as PositionProps,
      neighbouringRows: neighbouringRows,
      sameRow: sameRow,
      sideBySide: sideBySide,
    };

    handleUpdatePreferences(newPreferences, flightNumber);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
        <FormLabel component='legend'>Seating Proximity</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={neighbouringRows}
                onChange={handleChange}
                name='neighbouringRows'
              />
            }
            label='Neigbouring Rows OK'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sameRow}
                onChange={handleChange}
                name='sameRow'
              />
            }
            label='Same row OK'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sideBySide}
                onChange={handleChange}
                name='sideBySide'
              />
            }
            label='Side by side'
          />
          <Button onClick={doSubmit}>Submit Changes</Button>
        </FormGroup>
      </FormControl>
    </Box>
  );
}
