// import { useGetSideBySideMatches } from '../hooks/queries';
import {
  getSideBySideMatches,
  getSameRowMatches,
  getNeighbouringRowsMatches,
  getOffers,
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

const useOffers = (user_id: number, flight_id: string) => {
  return useQuery({
    queryKey: ['offers', flight_id, user_id],
    queryFn: () => getOffers({ flight_id, user_id }),
    enabled: true,
    // initialData:
  });
};

const GroupSeatOffers = ({ flight_id }: { flight_id: string }) => {
  const side_by_side_matches = useGetSideBySideMatches(21, flight_id);
  const same_row_matches = useSameRowMatches(21, flight_id);
  const neighbouring_rows_matches = useNeighbouringRowsMatches(21, flight_id);
  const offers = useOffers(21, flight_id);
  console.log('🚀 ~ GroupSeatOffers ~ offers:', offers);

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

  const offersFormatted = transformMatches(offers.data?.offers);
  console.log('🚀 ~ GroupSeatOffers ~ offersFormatted:', offersFormatted);

  const requestedFormatted = transformMatches(offers.data?.requested);
  console.log('🚀 ~ GroupSeatOffers ~ requestedFormatted:', requestedFormatted);

  const voidedFormatted = transformMatches(offers.data?.voided);
  console.log('🚀 ~ GroupSeatOffers ~ voidedFormatted:', voidedFormatted);

  return (
    <>
      <div className='flex justify-center items-center'>
        <Accordion
          defaultValue='item-1'
          type='single'
          collapsible
          className='w-full'
        >
          <AccordionItem value='item-1'>
            <AccordionTrigger> Offers</AccordionTrigger>
            <AccordionContent className='flex flex-col justify-center items-center'>
              {offersFormatted && offersFormatted.length > 0 && (
                <div>Offers</div>
              )}
              <div>
                {offersFormatted &&
                  offersFormatted.map((match: SeatProps[], index: number) => {
                    return <MatchCard key={index + 'offer'} match={match} />;
                  })}
              </div>
              {requestedFormatted && requestedFormatted.length > 0 && (
                <div>Requested</div>
              )}
              <div>
                {requestedFormatted &&
                  requestedFormatted.map(
                    (match: SeatProps[], index: number) => {
                      return (
                        <MatchCard key={index + 'requested'} match={match} />
                      );
                    }
                  )}
              </div>
              {voidedFormatted && voidedFormatted.length > 0 && (
                <div>Voided</div>
              )}
              <div>
                {voidedFormatted &&
                  voidedFormatted.map((match: SeatProps[], index: number) => {
                    return <MatchCard key={index + 'voided'} match={match} />;
                  })}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-1'>
            <AccordionTrigger> Side By Side Matches</AccordionTrigger>
            <AccordionContent className='flex flex-col justify-center items-center'>
              {sideBySideMatches &&
                sideBySideMatches.map((match: SeatProps[], index: number) => {
                  return <MatchCard key={index + 'sidebyside'} match={match} />;
                })}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger> Same Row Matches</AccordionTrigger>
            <AccordionContent className='flex flex-col justify-center items-center'>
              {sameRowMatches &&
                sameRowMatches.map((match: SeatProps[], index: number) => {
                  return <MatchCard key={index + 'samerow'} match={match} />;
                })}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger> Neighbouring Row Matches</AccordionTrigger>
            <AccordionContent className='flex flex-col justify-center items-center'>
              {neighbouringRowsMatches &&
                neighbouringRowsMatches.map(
                  (match: SeatProps[], index: number) => {
                    return (
                      <MatchCard
                        key={index + 'neighbouringrows'}
                        match={match}
                      />
                    );
                  }
                )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className='flex flex-col justify-center items-center gap-4'></div>
      </div>
    </>
  );
};

export default GroupSeatOffers;
