import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

import { Preferences } from '../../lib/types';

export default function FlightPreferences({
  preferences,
}: {
  preferences: Preferences;
}) {
  const [showEditPref, setShowEditPref] = useState(false);

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
      {showEditPref && <div>Edit Preferences Here</div>}
    </>
  );
}
