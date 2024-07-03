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
    neighbouring_row_pref: boolean;
    same_row_pref: boolean;
    side_by_side_pref: boolean;
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
                checked={preferences.neighbouring_row_pref}
                onChange={handleChange}
                name='neighbouring_row_pref'
              />
            }
            label='Neigbouring Rows OK'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.same_row_pref}
                onChange={handleChange}
                name='same_row_pref'
              />
            }
            label='Same row OK'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.side_by_side_pref}
                onChange={handleChange}
                name='side_by_side_pref'
              />
            }
            label='Side by side'
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}
