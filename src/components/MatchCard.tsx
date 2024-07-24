import { SeatProps } from '../../lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SeatCardSwap from './SeatCardSwap';

const MatchCard = (match: { match: SeatProps[] }) => {
  console.log(JSON.stringify(match.match, null, 2));

  return (
    <>
      <Card className='w-fit flex flex-row'>
        <div className='flex flex-row items-center'>
          <SeatCardSwap seat={match.match[0]} />
          <span className='mb-1'>
            <ArrowForwardIcon />
          </span>
          <SeatCardSwap seat={match.match[1]} />
          <Button className='p-0.5 px-1.5 mr-1 h-7 text-sm'>Request</Button>
          <Button className='p-0.5 px-1.5 mr-1 h-7 text-sm'>Approve</Button>
          <Button className='p-0.5 px-1.5 mr-1 h-7 text-sm'>Reject</Button>
          <Button className='p-0.5 px-1.5 mr-1 h-7 text-sm'>Cancel</Button>
        </div>
      </Card>
    </>
  );
};

export default MatchCard;
