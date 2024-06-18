import {
  PositionProps,
  PreferencesProps,
  LocationProps,
} from '../../lib/types';
import { Typography } from '@mui/material';
import SoloFlightPreferencesForm from './SoloFlightPreferencesForm';

export default function DefaultPreferences() {
  const handleUpdatePreferences = (newPreferences: PreferencesProps) => {
    console.log(newPreferences);
  };

  const mockPreferences = {
    location: '' as LocationProps,
    extraLegroom: false,
    position: 'window' as PositionProps,
    neighbouringRows: true,
    sameRow: true,
    sideBySide: false,
  };

  return (
    <>
      <Typography>Default Preferences Settings</Typography>
      <SoloFlightPreferencesForm
        preferences={mockPreferences}
        handleUpdatePreferences={handleUpdatePreferences}
        flightNumber='13'
      />
    </>
  );
}
