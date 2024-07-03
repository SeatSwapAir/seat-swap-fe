import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Switch,
  Typography,
  FormGroup,
  Checkbox,
} from '@mui/material';

import { PreferencesProps } from '../../lib/types';

export default function SoloFlightPreferencesForm({
  handleChangeSoloPreferences,
  preferences,
}: {
  handleChangeSoloPreferences: (newSoloPreferences: {
    legroom_pref: boolean;
    window_pref: boolean;
    middle_pref: boolean;
    aisle_pref: boolean;
    front_pref: boolean;
    center_pref: boolean;
    back_pref: boolean;
  }) => void;

  preferences: PreferencesProps;
}) {
  console.log('🚀 ~ preferences:', preferences.legroom_pref);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSoloPreferences = {
      ...preferences,
      [event.target.name]: event.target.checked,
    };
    console.log('🚀 ~ handleChange ~ event.target.name:', event.target.name);
    console.log(
      '🚀 ~ handleChange ~ event.target.checked:',
      event.target.checked
    );
    handleChangeSoloPreferences(updatedSoloPreferences);
  };
  return (
    <>
      <Typography>Preferences</Typography>
      <FormControl>
        <FormLabel id='demo-controlled-radio-buttons-group'>Location</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.window_pref}
                onChange={handleChange}
                name='window_pref'
              />
            }
            label='Window'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.middle_pref}
                onChange={handleChange}
                name='middle_pref'
              />
            }
            label='Middle'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.aisle_pref}
                onChange={handleChange}
                name='aisle_pref'
              />
            }
            label='Aisle'
          />
        </FormGroup>
      </FormControl>
      <FormControl>
        <FormLabel id='demo-controlled-radio-buttons-group'>
          Seat Position
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.front_pref}
                onChange={handleChange}
                name='front_pref'
              />
            }
            label='Front of plane'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.center_pref}
                onChange={handleChange}
                name='center_pref'
              />
            }
            label='Middle of plane'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.back_pref}
                onChange={handleChange}
                name='back_pref'
              />
            }
            label='Back of plane'
          />
        </FormGroup>
      </FormControl>
      <FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={preferences.legroom_pref}
                onChange={handleChange}
                name='legroom_pref'
              />
            }
            label='Extra legroom preferred'
          />
        </FormGroup>
      </FormControl>
    </>
  );
}
