// import { useGetSideBySideMatches } from '../hooks/queries';
import {
  getSideBySideMatches,
  getSameRowMatches,
  getNeighbouringRowsMatches,
} from '../api/seatSwapAPI';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import {
  MatchProps,
  SeatProps,
  SideBySideMatchesProps,
  SameRowMatchesProps,
  NeighbouringRowsMatchesProps,
} from '../../lib/types';
import MatchCard from './MatchCard';

const useGetSideBySideMatches = (user_id: number, flight_id: string) => {
  return useQuery({
    queryKey: ['side_bySide_matches', flight_id, user_id],
    queryFn: () => getSideBySideMatches({ flight_id, user_id }),
    enabled: true,
    // initialData:
  });
};

const useSameRowMatches = (user_id: number, flight_id: string) => {
  return useQuery({
    queryKey: ['same_row_matches', flight_id, user_id],
    queryFn: () => getSameRowMatches({ flight_id, user_id }),
    enabled: true,
    // initialData:
  });
};

const useNeighbouringRowsMatches = (user_id: number, flight_id: string) => {
  return useQuery({
    queryKey: ['neighbouring_rows_matches', flight_id, user_id],
    queryFn: () => getNeighbouringRowsMatches({ flight_id, user_id }),
    enabled: true,
    // initialData:
  });
};

const GroupSeatOffers = ({ flight_id }: { flight_id: string }) => {
  const side_by_side_matches = useGetSideBySideMatches(24, flight_id);
  const same_row_matches = useSameRowMatches(24, flight_id);
  const neighbouring_rows_matches = useNeighbouringRowsMatches(24, flight_id);
  console.log('🚀 ~ GroupSeatOffers ~ same_row_matches:', same_row_matches);

  const transformMatches = (matches: MatchProps[] | undefined) => {
    if (!matches) return;
    return matches.flatMap((seat) =>
      seat.offer_seats.map((offer_seat) => [seat.current_seats, offer_seat])
    );
  };
  const sideBySideMatches = transformMatches(
    side_by_side_matches.data?.side_by_side_matches
  );

  const sameRowMatches = transformMatches(
    same_row_matches.data?.same_row_matches
  );

  const neighbouringRowsMatches = transformMatches(
    neighbouring_rows_matches.data?.neighbouring_rows_matches
  );

  return (
    <>
      <div>
        Side By Side Matches
        {sideBySideMatches &&
          sideBySideMatches.map((match: SeatProps[], index: number) => {
            return <MatchCard key={index + 'sidebyside'} match={match} />;
          })}
        Same Row Matches
        {sameRowMatches &&
          sameRowMatches.map((match: SeatProps[], index: number) => {
            return <MatchCard key={index + 'samerow'} match={match} />;
          })}
        Neighbouring Row Matches
        {neighbouringRowsMatches &&
          neighbouringRowsMatches.map((match: SeatProps[], index: number) => {
            return <MatchCard key={index + 'neighbouringrows'} match={match} />;
          })}
      </div>
    </>
  );
};

export default GroupSeatOffers;
