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

  const handleChangeLegroomPreferences = (newLegroom: boolean) => {
    console.log(newLegroom);
  };
  const handleChangePositionPreferences = (newPosition: PositionProps) => {
    console.log(newPosition);
  };
  const handleChangeLocationPreferences = (newLocation: LocationProps) => {
    console.log(newLocation);
  };

  return (
    <>
      <Typography>Default Preferences Settings</Typography>
      <SoloFlightPreferencesForm
        handleChangeLegroomPreferences={handleChangeLegroomPreferences}
        handleChangePositionPreferences={handleChangePositionPreferences}
        handleChangeLocationPreferences={handleChangeLocationPreferences}
        preferences={mockPreferences}
        handleUpdatePreferences={handleUpdatePreferences}
      />
    </>
  );
}
