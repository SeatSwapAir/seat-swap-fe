import { SeatProps } from '../../lib/types';

const MatchCard = (match: { match: SeatProps[] }) => {
  console.log(JSON.stringify(match.match, null, 2));

  return (
    <div>{`Swap ${match.match[0].seat_row}${match.match[0].seat_letter} 
    For ${match.match[1].seat_row}${match.match[1].seat_letter}`}</div>
  );
};

export default MatchCard;
