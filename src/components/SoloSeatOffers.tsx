// import { getOffers, getAllSeats } from '../api/seatSwapAPI';
// import { useQuery } from '@tanstack/react-query';
// import { MatchProps, SeatProps } from '../../lib/types';
// import MatchCard from './MatchCard';
// import FilterMatches from './FilterMatches';
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/accordion';

// const useOffers = (user_id: number, flight_id: string) => {
//   return useQuery({
//     queryKey: ['offers', flight_id, user_id],
//     queryFn: () => getOffers({ flight_id, user_id }),
//     enabled: true,
//     // initialData:
//   });
// };

// const useAllSeats = (user_id: number, flight_id: string) => {
//   return useQuery({
//     queryKey: ['all_matches', flight_id, user_id],
//     queryFn: () => getAllSeats({ flight_id, user_id }),
//     enabled: true,
//     // initialData:
//   });
// };

// const SoloSeatOffers = ({ flight_id }: { flight_id: string }) => {
//   const all_matches = useAllSeats(21, flight_id);

//   const offers = useOffers(21, flight_id);

//   const transformMatches = (matches: MatchProps[] | undefined) => {
//     if (!matches) return;
//     return matches.flatMap((seat) =>
//       seat.offer_seats.map((offer_seat) => [seat.current_seats, offer_seat])
//     );
//   };

//   const allMatches = transformMatches(all_matches.data?.all_matches);

//   const offersFormatted = transformMatches(offers.data?.offers);

//   const requestedFormatted = transformMatches(offers.data?.requested);

//   const voidedFormatted = transformMatches(offers.data?.voided);

//   return (
//     <>
//       <div className='flex justify-center items-center'>
//         <Accordion
//           defaultValue='item-1'
//           type='single'
//           collapsible
//           className='w-full'
//         >
//           <AccordionItem value='item-1'>
//             <AccordionTrigger> Offers</AccordionTrigger>
//             <AccordionContent className='flex flex-col justify-center items-center'>
//               {offersFormatted && offersFormatted.length > 0 && (
//                 <div>Offers</div>
//               )}
//               <div>
//                 {offersFormatted &&
//                   offersFormatted.map((match: SeatProps[], index: number) => {
//                     return <MatchCard key={index + 'offer'} match={match} />;
//                   })}
//               </div>
//               {requestedFormatted && requestedFormatted.length > 0 && (
//                 <div>Requested</div>
//               )}
//               <div>
//                 {requestedFormatted &&
//                   requestedFormatted.map(
//                     (match: SeatProps[], index: number) => {
//                       return (
//                         <MatchCard key={index + 'requested'} match={match} />
//                       );
//                     }
//                   )}
//               </div>
//               {voidedFormatted && voidedFormatted.length > 0 && (
//                 <div>Voided</div>
//               )}
//               <div>
//                 {voidedFormatted &&
//                   voidedFormatted.map((match: SeatProps[], index: number) => {
//                     return <MatchCard key={index + 'voided'} match={match} />;
//                   })}
//               </div>
//             </AccordionContent>
//           </AccordionItem>
//           <AccordionItem value='item-2'>
//             <AccordionTrigger> All Seats</AccordionTrigger>
//             <AccordionContent className='flex flex-col justify-center items-center'>
//               {allMatches && <FilterMatches allMatches={allMatches} />}
//             </AccordionContent>
//           </AccordionItem>
//         </Accordion>
//         <div className='flex flex-col justify-center items-center gap-4'></div>
//       </div>
//     </>
//   );
// };

// export default SoloSeatOffers;
