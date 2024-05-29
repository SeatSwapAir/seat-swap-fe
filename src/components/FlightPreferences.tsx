import { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import { Typography, Button } from "@mui/material";

import { FlightCardProps, Preferences, Seat } from "../../lib/types";

import GroupFlightPreferencesForm from "./GroupFlightPreferencesForm";
import SoloFlightPreferencesForm from "./SoloFlightPreferencesForm";

export default function FlightPreferences({
  preferences,
  seats,
  flightNumber,
  handleUpdatePreferences,
}: {
  preferences: Preferences;
  seats: Seat[];
  flightNumber: string;
  handleUpdatePreferences: FlightCardProps["handleUpdatePreferences"];
}) {
  const [showEditPref, setShowEditPref] = useState(false);

  return (
    <>
      <Typography variant="h5">
        Preferences
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowEditPref(!showEditPref)}
        >
          <EditIcon />
          Edit Preferences
        </Button>
      </Typography>
      <Typography variant="body2">
        Location: {preferences.location} - Position: {preferences.position} -{" "}
        {preferences.extraLegroom ? "Extra Legroom" : "Standard Legroom"} -{" "}
        {preferences.neighbouringRows
          ? "Neighbouring Rows"
          : "No Neighbouring Rows"}{" "}
        - {preferences.sameRow ? "Same Row" : "Different Row"} -{" "}
        {preferences.sideBySide ? "Side by Side" : "No Side by Side"}
      </Typography>
      {showEditPref && seats.length === 0 && (
        <p>Add seats to chooose preferences</p>
      )}
      {showEditPref && seats.length === 1 && (
        <SoloFlightPreferencesForm
          preferences={preferences}
          handleUpdatePreferences={handleUpdatePreferences}
          flightNumber={flightNumber}
        />
      )}
      {showEditPref && seats.length > 1 && (
        <GroupFlightPreferencesForm
          preferences={preferences}
          handleUpdatePreferences={handleUpdatePreferences}
          flightNumber={flightNumber}
        />
      )}
    </>
  );
}
