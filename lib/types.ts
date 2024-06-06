export type Position = 'window' | 'middle' | 'aisle' | '';
export type Location = 'front' | 'middle' | 'back' | '';

export type User = {
  email: string;
  firstname: string;
  lastname: string;
  gender: number;
  phone: number;
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

export type FlightProps = {
    flightNumber: string;
    departureAirport: string;
    arrivalAirport: string;
    departureTime: string;
    arrivalTime: string;
    airline: string;
    seats: Seat[];
    preferences: Preferences;
  };

export type FlightCardProps = {
  flight: FlightProps;
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
  handleRemoveFlight: React.MouseEventHandler<HTMLButtonElement>;
  handleUpdateSeat: (seat: Seat, flightNumber:string, oldSeat:string) => void;
  handleUpdatePreferences: (preferences: Preferences,flightNumber: string) => void;
};
export type AddFlightProps = {
  handleAddFlight: (flight: FlightProps) => boolean;
  checkIfFlightIsThere: (flightNumber: string | null, departureTime: string) => boolean 

}