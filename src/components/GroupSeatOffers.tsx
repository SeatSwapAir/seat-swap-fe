// import { useGetSideBySideMatches } from '../hooks/queries';
import { getSideBySideMatches } from '../api/seatSwapAPI';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { MatchProps, SeatProps, SideBySideMatchesProps } from '../../lib/types';
import MatchCard from './MatchCard';

const useGetSideBySideMatches = (user_id: number, flight_id: string) => {
  return useQuery({
    queryKey: ['side_bySide_matches', flight_id, user_id],
    queryFn: () => getSideBySideMatches({ flight_id, user_id }),
    enabled: true,
    // initialData:
  });
};
const GroupSeatOffers = ({ flight_id }: { flight_id: string }) => {
  const side_by_side_matches = useGetSideBySideMatches(24, flight_id);

  const transformMatches = (matches: MatchProps[] | undefined) => {
    if (!matches) return;
    return matches.flatMap((seat) =>
      seat.offer_seats.map((offer_seat) => [seat.current_seats, offer_seat])
    );
  };
  const SideBySideMatches = transformMatches(
    side_by_side_matches.data?.side_by_side_matches
  );

  return (
    <>
      <div>
        Side By Side Matches
        {SideBySideMatches &&
          SideBySideMatches.map((match: SeatProps[], index: number) => {
            return <MatchCard key={index} match={match} />;
          })}
        Same Row Matches
        {SideBySideMatches &&
          SideBySideMatches.map((match: SeatProps[], index: number) => {
            return <MatchCard key={index} match={match} />;
          })}
      </div>
    </>
  );
};

export default GroupSeatOffers;
