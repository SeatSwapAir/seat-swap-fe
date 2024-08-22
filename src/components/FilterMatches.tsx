import { MatchProps, SeatProps } from 'lib/types';
import { useState, useMemo } from 'react';
import MatchCard from './MatchCard';
import { Label } from './ui/label';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import AircraftSeatAisle from '@/components/ui/icons/AircraftSeatAisle';
import AircraftSeatMiddle from '@/components/ui/icons/AircraftSeatMiddle';
import AircraftSeatWindow from '@/components/ui/icons/AircraftSeatWindow';
import AircraftSeatExtraLegroom from '@/components/ui/icons/AircraftSeatExtraLegroom';
import AircraftSeatReducedLegroom from '@/components/ui/icons/AircraftSeatReducedLegroom';
import AircraftFrontSection from '@/components/ui/icons/AircraftFrontSection';
import AircraftCenterSection from '@/components/ui/icons/AircraftCenterSection';
import AircraftBackSection from '@/components/ui/icons/AircraftBackSection';
import { useAllSeats } from '@/hooks/queries';

const FilterMatches = () => {
  const [selectedFilters, setselectedFilters] = useState<string[]>([
    'front',
    'center',
    'back',
    'aisle',
    'middle',
    'window',
    'extra',
    'standard',
  ]);
  const all_seats = useAllSeats(21, '8');
  const transformMatches = (matches: MatchProps[] | undefined) => {
    if (!matches) return;
    return matches.flatMap((seat) =>
      seat.offer_seats.map((offer_seat) => [seat.current_seats, offer_seat])
    );
  };

  const all_seats_formatted = transformMatches(all_seats.data?.all_matches);

  const filteredSeats = useMemo(() => {
    return all_seats_formatted?.filter((match) => {
      const [, offerSeat] = match;
      const { position, location, extraLegroom } = offerSeat;
      return (
        (selectedFilters.includes('window') || position !== 'window') &&
        (selectedFilters.includes('middle') || position !== 'middle') &&
        (selectedFilters.includes('aisle') || position !== 'aisle') &&
        (selectedFilters.includes('front') || location !== 'front') &&
        (selectedFilters.includes('center') || location !== 'center') &&
        (selectedFilters.includes('back') || location !== 'back') &&
        (selectedFilters.includes('extra') || !extraLegroom) &&
        (selectedFilters.includes('standard') || extraLegroom)
      );
    });
  }, [selectedFilters, all_seats_formatted]);

  return (
    <>
      <div className=' pb-1 '>
        <Label htmlFor='filters'>Filters</Label>
        <ToggleGroup
          size={'sm'}
          className='md:gap-1 gap-0'
          id='filters'
          type='multiple'
          variant='outline'
          aria-label='filters'
          value={selectedFilters}
          onValueChange={(value) => {
            setselectedFilters(value);
          }}
        >
          <ToggleGroupItem aria-label='Front of plane' value='front'>
            <AircraftFrontSection className='w-6 h-6' />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label='Center of plane' value='center'>
            <AircraftCenterSection className='w-6 h-6' />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label='Back of plane' value='back'>
            <AircraftBackSection className='w-6 h-6' />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label='Aisle Seat' value='aisle'>
            <AircraftSeatAisle className='w-6 h-6' />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label='Middle Seat' value='middle'>
            <AircraftSeatMiddle className='w-6 h-6' />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label='Window Seat' value='window'>
            <AircraftSeatWindow className='w-6 h-6' />
          </ToggleGroupItem>
          <ToggleGroupItem value='extra' aria-label='Extra Legroom Seat'>
            <AircraftSeatExtraLegroom className='w-6 h-6' />
          </ToggleGroupItem>
          <ToggleGroupItem value='standard' aria-label='Reduced Legroom Seat'>
            <AircraftSeatReducedLegroom className='w-6 h-6' />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      {filteredSeats &&
        filteredSeats.map((match: SeatProps[], index: number) => {
          return <MatchCard key={index + 'filtered'} match={match} />;
        })}
    </>
  );
};

export default FilterMatches;
