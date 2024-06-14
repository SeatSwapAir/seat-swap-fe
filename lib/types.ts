export type PositionProps = 'window' | 'middle' | 'aisle' | '';
export type LocationProps = 'front' | 'middle' | 'back' | '';

export type UserProps = {
  email: string;
  firstname: string;
  lastname: string;
  gender: number;
  phone: number;
  rating: number;
  created_at: string;
};

export type SeatProps = {
  number: string;
  location: LocationProps;
  extraLegroom: boolean;
  position: PositionProps;
  id: string;
  isEditing: boolean;
};
export type PreferencesProps = {
  location: LocationProps;
  extraLegroom: boolean;
  position: PositionProps;
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
    seats: SeatProps[];
    preferences: PreferencesProps;
    id: string
  };

export type FlightCardProps = {
  flight: FlightProps;
  handleRemoveFlight: React.MouseEventHandler<HTMLButtonElement>;
  handleUpdateSeat: (seat: SeatProps, flightNumber:string, oldSeat:string) => void;
  handleUpdatePreferences: (preferences: PreferencesProps,flightNumber: string) => void;
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