import { Typography } from '@mui/material';
import { PreferencesProps } from '../../lib/types';

export default function FlightPreferences({
  preferences,
}: {
  preferences: PreferencesProps;
}) {
  console.log('🚀 ~ preferences:', preferences);
  const {
    extraLegroom,
    window_pref,
    middle_pref,
    aisle_pref,
    front_pref,
    center_pref,
    back_pref,
    sameRow,
    neighbouringRows,
    sideBySide,
  } = preferences;
  return (
    <>
      <Typography variant='body2'>Preferences</Typography>
      <Typography variant='body2'>
        {extraLegroom ? 'Extra Legroom' : 'Standard Legroom'} -{' '}
        {neighbouringRows ? 'Neighbouring Rows' : 'No Neighbouring Rows'} -{' '}
        {sameRow ? 'Same Row ok' : 'Different Row ok'} -{' '}
        {sideBySide ? 'Side by Side' : 'No Side by Side'}
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
