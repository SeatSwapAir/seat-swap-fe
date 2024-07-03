import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Box,
  Checkbox,
  FormGroup,
  Typography,
} from '@mui/material';

import { PreferencesProps } from '../../lib/types';

export default function GroupFlightPreferencesForm({
  handleChangeGroupPreferences,
  preferences,
}: {
  handleChangeGroupPreferences: (newGroupPreferences: {
    neighbouringRows: boolean;
    sameRow: boolean;
    sideBySide: boolean;
  }) => void;
  preferences: PreferencesProps;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedGroupPreferences = {
      ...preferences,
      [event.target.name]: event.target.checked,
    };
    handleChangeGroupPreferences(updatedGroupPreferences);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Typography>Preferences</Typography>
      <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
        <FormLabel component='legend'>Seating Proximity</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.neighbouringRows}
                onChange={handleChange}
                name='neighbouringRows'
              />
            }
            label='Neigbouring Rows OK'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.sameRow}
                onChange={handleChange}
                name='sameRow'
              />
            }
            label='Same row OK'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.sideBySide}
                onChange={handleChange}
                name='sideBySide'
              />
            }
            label='Side by side'
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}
