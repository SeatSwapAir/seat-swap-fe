import { SeatProps } from 'lib/types';
import { useState, useMemo } from 'react';
import MatchCard from './MatchCard';

const FilterMatches = ({
  allMatches,
}: {
  allMatches: SeatProps[][] | undefined;
}) => {
  const [windowSeats, setWindowSeats] = useState(true);
  const [middleSeats, setMiddleSeats] = useState(true);
  const [aisleSeats, setAisleSeats] = useState(true);
  const [frontSeats, setFrontSeats] = useState(true);
  const [centerSeats, setCenterSeats] = useState(true);
  const [backSeats, setBackSeats] = useState(true);
  const [extraLegroomSeats, setExtraLegroomSeats] = useState(true);

  const filteredMatches = useMemo(() => {
    return allMatches?.filter((match) => {
      const [, offerSeat] = match;
      return (
        (windowSeats || offerSeat.position !== 'window') &&
        (middleSeats || offerSeat.position !== 'middle') &&
        (aisleSeats || offerSeat.position !== 'aisle') &&
        (frontSeats || offerSeat.location !== 'front') &&
        (centerSeats || offerSeat.location !== 'center') &&
        (backSeats || offerSeat.location !== 'back') &&
        (extraLegroomSeats || !offerSeat.extraLegroom)
      );
    });
  }, [
    allMatches,
    windowSeats,
    middleSeats,
    aisleSeats,
    frontSeats,
    centerSeats,
    backSeats,
    extraLegroomSeats,
  ]);

  return (
    <div>
      <div>
        <label>
          <input
            type='checkbox'
            checked={windowSeats}
            onChange={(e) => setWindowSeats(e.target.checked)}
          />
          Window Seats
        </label>
        <label>
          <input
            type='checkbox'
            checked={middleSeats}
            onChange={(e) => setMiddleSeats(e.target.checked)}
          />
          Middle Seats
        </label>
        <label>
          <input
            type='checkbox'
            checked={aisleSeats}
            onChange={(e) => setAisleSeats(e.target.checked)}
          />
          Aisle Seat
        </label>
        <label>
          <input
            type='checkbox'
            checked={frontSeats}
            onChange={(e) => setFrontSeats(e.target.checked)}
          />
          Front Seat
        </label>
        <label>
          <input
            type='checkbox'
            checked={centerSeats}
            onChange={(e) => setCenterSeats(e.target.checked)}
          />
          Center Seat
        </label>
        <label>
          <input
            type='checkbox'
            checked={backSeats}
            onChange={(e) => setBackSeats(e.target.checked)}
          />
          Back Seat
        </label>
        <label>
          <input
            type='checkbox'
            checked={extraLegroomSeats}
            onChange={(e) => setExtraLegroomSeats(e.target.checked)}
          />
          Extra Legroom Seats
        </label>
      </div>

      {filteredMatches &&
        filteredMatches.map((match: SeatProps[], index: number) => {
          return <MatchCard key={index + 'filtered'} match={match} />;
        })}
    </div>
  );
};

export default FilterMatches;
