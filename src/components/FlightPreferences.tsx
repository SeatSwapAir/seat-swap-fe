import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  FormGroup,
  Typography,
  Button,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Switch,
  Checkbox,
} from '@mui/material';

import { FlightCardProps, Preferences } from '../../lib/types';
import { Location } from '../../lib/types';
import { Position } from '../../lib/types';
import { Seat } from '../../lib/types';
export default function FlightPreferences({
  preferences,
  seats,
  flightNumber,
  handleUpdatePreferences,
}: {
  preferences: Preferences;
  seats: Seat[];
  flightNumber: string;
  handleUpdatePreferences: FlightCardProps['handleUpdatePreferences'];
}) {
  const [showEditPref, setShowEditPref] = useState(false);
  const [location, setLocation] = useState<Location>(preferences.location);
  const [position, setPosition] = useState<Position>(preferences.position);
  const [extraLegroom, setExtraLegroom] = useState(preferences.extraLegroom);
  const [groupPreferences, setGroupPreferences] = useState({
    neighbouringRows: true,
    sameRow: false,
    sideBySide: false,
  });
  const { neighbouringRows, sameRow, sideBySide } = groupPreferences;
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
    const isSoloFlignt = seats.length === 1;
    const newPreferences = {
      location: isSoloFlignt ? location : '',
      extraLegroom: isSoloFlignt ? extraLegroom : false,
      position: isSoloFlignt ? position : '',
      neighbouringRows: isSoloFlignt ? false : neighbouringRows,
      sameRow: isSoloFlignt ? false : sameRow,
      sideBySide: isSoloFlignt ? false : sideBySide,
    };
    handleUpdatePreferences(newPreferences, flightNumber);
    setShowEditPref(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupPreferences({
      ...groupPreferences,
      [event.target.name]: event.target.checked,
    });
  };
  const GroupFlightPreferencesForm = () => {
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
  };

  const SoloFlightPreferencesForm = () => {
    return (
      <>
        <FormControl>
          <FormLabel id='demo-controlled-radio-buttons-group'>
            Location
          </FormLabel>
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
            <FormControlLabel
              value='window'
              control={<Radio />}
              label='Window'
            />
            <FormControlLabel
              value='middle'
              control={<Radio />}
              label='Middle'
            />
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
  };

  return (
    <>
      <Typography variant='h5'>
        Preferences
        <Button
          variant='contained'
          color='primary'
          onClick={() => setShowEditPref(!showEditPref)}
        >
          <EditIcon />
          Edit Preferences
        </Button>
      </Typography>
      <Typography variant='body2'>
        Location: {preferences.location} - Position: {preferences.position} -{' '}
        {preferences.extraLegroom ? 'Extra Legroom' : 'Standard Legroom'} -{' '}
        {preferences.neighbouringRows
          ? 'Neighbouring Rows'
          : 'No Neighbouring Rows'}{' '}
        - {preferences.sameRow ? 'Same Row' : 'Different Row'} -{' '}
        {preferences.sideBySide ? 'Side by Side' : 'No Side by Side'}
      </Typography>
      {showEditPref && seats.length === 0 && (
        <p>Add seats to chooose preferences</p>
      )}
      {showEditPref && seats.length === 1 && <SoloFlightPreferencesForm />}
      {showEditPref && seats.length > 1 && <GroupFlightPreferencesForm />}
    </>
  );
}
