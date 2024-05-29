import { Position, Preferences, Location } from "../../lib/types";
import { Typography } from "@mui/material";
import SoloFlightPreferencesForm from "./SoloFlightPreferencesForm";

export default function DefaultPreferences() {
  const handleUpdatePreferences = (newPreferences: Preferences) => {
    console.log(newPreferences);
  };

  const mockPreferences = {
    location: "" as Location,
    extraLegroom: false,
    position: "window" as Position,
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
        flightNumber="13"
      />
    </>
  );
}
