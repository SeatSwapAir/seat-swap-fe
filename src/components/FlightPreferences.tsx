import { Typography } from '@mui/material';
import { PreferencesProps } from '../../lib/types';

export default function FlightPreferences({
  preferences,
}: {
  preferences: PreferencesProps;
}) {
  const {
    legroom_pref,
    window_pref,
    middle_pref,
    aisle_pref,
    front_pref,
    center_pref,
    back_pref,
    same_row_pref,
    neighbouring_row_pref,
    side_by_side_pref,
  } = preferences;
  return (
    <>
      <Typography variant='body2'>Preferences</Typography>
      <Typography variant='body2'>
        {legroom_pref ? 'Extra Legroom' : 'Standard Legroom'} -{' '}
        {neighbouring_row_pref ? 'Neighbouring Rows' : 'No Neighbouring Rows'} -{' '}
        {same_row_pref ? 'Same Row ok' : 'Different Row ok'} -{' '}
        {side_by_side_pref ? 'Side by Side' : 'No Side by Side'}
        {window_pref ? 'Window' : 'No Window'} -{' '}
        {middle_pref ? 'Middle' : 'No Middle'} -{' '}
        {aisle_pref ? 'Aisle' : 'No Aisle'} -{' '}
        {front_pref ? 'Front' : 'No Front'} -{' '}
        {center_pref ? 'Center' : 'No Center'} -{' '}
        {back_pref ? 'Back' : 'No Back'}
      </Typography>
    </>
  );
}
