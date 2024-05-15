export type Position = 'window' | 'middle' | 'aisle' | 'none';
export type Location = 'front' | 'middle' | 'back' | 'none';

export type Seat = {
  number: string;
  location: Location;
  extraLegroom: boolean;
  position: Position;
};
export type Preferences = {
  location: Location;
  extraLegroom: boolean;
  position: Position;
  neighbouringRows: boolean;
  sameRow: boolean;
  sideBySide: boolean;
};

export type FlightCardProps = {
  flight: {
    flightNumber: string;
    departureAirport: string;
    arrivalAirport: string;
    departureTime: string;
    arrivalTime: string;
    airline: string;
    seats: Seat[];
    preferences: Preferences[];
  };
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
  handleRemoveFlight: React.MouseEventHandler<HTMLButtonElement>;
};