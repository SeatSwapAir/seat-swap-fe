export type Position = 'window' | 'middle' | 'aisle' | '';
export type Location = 'front' | 'middle' | 'back' | '';

export type User = {
  email: string;
  firstname: string;
  lastname: string;
  gender: string;
  phone: number;
  password: string;
  rating: number;
  created_at: string;
};

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
    preferences: Preferences;
  };
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
  handleRemoveFlight: React.MouseEventHandler<HTMLButtonElement>;
  handleUpdateSeat: (seat: Seat, flightNumber:string, oldSeat:string) => void;
  handleUpdatePreferences: (preferences: Preferences,flightNumber: string) => void;
};