import { Typography } from '@mui/material';

import { Preferences } from '../../lib/types';

export default function FlightPreferences({
  preferences,
}: {
  preferences: Preferences;
}) {
  return (
    <>
      <Typography variant='body2'>Preferences</Typography>
      <Typography variant='body2'>
        Location: {preferences.location} - Position: {preferences.position} -{' '}
        {preferences.extraLegroom ? 'Extra Legroom' : 'Standard Legroom'} -{' '}
        {preferences.neighbouringRows
          ? 'Neighbouring Rows'
          : 'No Neighbouring Rows'}{' '}
        - {preferences.sameRow ? 'Same Row' : 'Different Row'} -{' '}
        {preferences.sideBySide ? 'Side by Side' : 'No Side by Side'}
      </Typography>
    </>
  );
}
