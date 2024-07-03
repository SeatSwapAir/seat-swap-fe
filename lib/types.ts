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
  legroom_pref: boolean;
  window_pref: boolean;
  middle_pref: boolean;
  aisle_pref: boolean;
  front_pref: boolean;
  center_pref: boolean;
  back_pref: boolean;
  same_row_pref: boolean;
  neighbouring_row_pref: boolean;
  side_by_side_pref: boolean;
};

export type FlightProps = {
  flightnumber: string;
  departureairport: string;
  arrivalairport: string;
  departuretime: string;
  arrivaltime: string;
  airline: string;
  seats: SeatProps[];
  preferences: PreferencesProps;
  id: string;
};

export type FlightCardProps = {
  flight: FlightProps;
  handleRemoveFlight: React.MouseEventHandler<HTMLButtonElement>;
};
export type showEditSeat = (id: string) => void;
export type AddFlightProps = {
  handleAddFlight: (flight: FlightProps) => boolean;
  checkIfFlightIsThere: (
    flightNumber: string | null,
    departureTime: string
  ) => boolean;
};
export type GetToken = () => Promise<string>;
export type GetFlightDetails = (
  carrierCode: string,
  flightNumber: string,
  scheduledDepartureDate: string | undefined,
  headers: object
) => Promise<FlightProps | void>;

export type GetAirlineName = (
  carrierCode: string,
  headers: object
) => Promise<string | void>;
