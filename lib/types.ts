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
  id: string;
  isEditing: boolean;
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
    id: string
  };

export type FlightCardProps = {
  flight: FlightProps;
  handleRemoveFlight: React.MouseEventHandler<HTMLButtonElement>;
  handleUpdateSeat: (seat: Seat, flightNumber:string, oldSeat:string) => void;
  handleUpdatePreferences: (preferences: Preferences,flightNumber: string) => void;
  handleSubmitFlightChanges: (flight: FlightProps) => void;
};
export type showEditSeat = (id:string) => void;
export type AddFlightProps = {
  handleAddFlight: (flight: FlightProps) => boolean;
  checkIfFlightIsThere: (flightNumber: string | null, departureTime: string) => boolean 
}
export type GetToken = () => Promise<string>;
export type GetFlightDetails = (carrierCode: string, flightNumber:string, scheduledDepartureDate: string | undefined,headers: object) => Promise<FlightProps | void> 

export type GetAirlineName = (carrierCode: string, headers: object) =>  Promise<string | void>