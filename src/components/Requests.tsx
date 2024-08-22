import { MatchProps, SeatProps } from 'lib/types';
import RequestCard from './RequestCard';
import { useOffers } from '@/hooks/queries';

const Requests = ({
  user_id,
  flight_id,
}: {
  user_id: number;
  flight_id: string;
}) => {
  const offers = useOffers(user_id, flight_id);

  const transformMatches = (matches: MatchProps[] | undefined) => {
    if (!matches) return;
    return matches.flatMap((seat) =>
      seat.offer_seats.map((offer_seat) => [seat.current_seats, offer_seat])
    );
  };

  const offers_formatted = transformMatches(offers.data?.requested);

  return (
    <>
      {offers_formatted &&
        offers_formatted.map((match: SeatProps[], index: number) => {
          return <RequestCard key={index + 'filtered'} match={match} />;
        })}
    </>
  );
};

export default Requests;