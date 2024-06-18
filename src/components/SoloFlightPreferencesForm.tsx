import {
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';

import {
  PreferencesProps,
  LocationProps,
  PositionProps,
} from '../../lib/types';

export default function SoloFlightPreferencesForm({
  handleChangeLegroomPreferences,
  handleChangePositionPreferences,
  handleChangeLocationPreferences,
  preferences,
}: {
  handleUpdatePreferences: (newPreferences: PreferencesProps) => void;
  handleChangeLegroomPreferences: (newLegroom: boolean) => void;
  handleChangePositionPreferences: (newPosition: PositionProps) => void;
  handleChangeLocationPreferences: (newLocation: LocationProps) => void;

  preferences: PreferencesProps;
}) {
  const doLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeLocationPreferences(event.target.value as LocationProps);
  };

  const doPosition = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangePositionPreferences(event.target.value as PositionProps);
  };

  const toggleLegroom = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeLegroomPreferences(event.target.checked);
  };

  return (
    <>
      <Typography>Preferences</Typography>
      <FormControl>
        <FormLabel id='demo-controlled-radio-buttons-group'>Location</FormLabel>
        <RadioGroup
          aria-labelledby='demo-controlled-radio-buttons-group'
          name='controlled-radio-buttons-group'
          value={preferences.location}
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
          value={preferences.position}
          onChange={doPosition}
        >
          <FormControlLabel value='window' control={<Radio />} label='Window' />
          <FormControlLabel value='middle' control={<Radio />} label='Middle' />
          <FormControlLabel value='aisle' control={<Radio />} label='Aisle' />
        </RadioGroup>
      </FormControl>
      <FormControlLabel
        control={
          <Switch checked={preferences.extraLegroom} onChange={toggleLegroom} />
        }
        label='Extra legroom preferred'
      />
      {/* <Button onClick={doSubmit}>Submit Changes</Button> */}
    </>
  );
}
