import { SeatProps } from '../../lib/types';
import { Card } from '@/components/ui/card';
import { Button } from './ui/button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SeatCardSwap from './SeatCardSwap';
import { useMatchStatus } from '../hooks/queries';
import { usePostSwapRequest, usePatchSwapRequest } from '../hooks/mutations';

const MatchCard = (match: { match: SeatProps[] }) => {
  const matchStatus = useMatchStatus(match.match[0].id, match.match[1].id);
  console.log('🚀 ~ MatchCard ~ matchStatus:', matchStatus.data);
  const postSwapRequest = usePostSwapRequest(
    match.match[0].id,
    match.match[1].id
  );
  const patchSwapRequest = usePatchSwapRequest(
    match.match[0].id,
    match.match[1].id
  );

  const handleSwapRequest = () => {
    postSwapRequest.mutate({
      body: {
        offered_seat_id: match.match[0].id,
        requested_seat_id: match.match[1].id,
      },
    });
  };
  const handlePatchSwapRequest = () => {
    if (!matchStatus.data?.swap_id && !matchStatus.data?.actions?.[0]) return;
    if (!matchStatus.data.swap_id) return;
    patchSwapRequest.mutate({
      body: {
        action: matchStatus.data.actions[0],
      },
      params: {
        swap_id: matchStatus.data.swap_id,
      },
    });
  };

  return (
    <>
      <Card className='w-fit flex flex-row'>
        <div className='flex flex-row items-center'>
          <SeatCardSwap seat={match.match[0]} />
          <span className='mb-1'>
            <ArrowForwardIcon />
          </span>
          <SeatCardSwap seat={match.match[1]} />
          {matchStatus.data?.actions.includes('request') && (
            <Button
              className='p-0.5 px-1.5 mr-1 h-7 text-sm'
              onClick={handleSwapRequest}
            >
              Request
            </Button>
          )}
          {matchStatus.data?.actions.includes('reject') && (
            <>
              <Button className='p-0.5 px-1.5 mr-1 h-7 text-sm'>Approve</Button>
              <Button className='p-0.5 px-1.5 mr-1 h-7 text-sm'>Reject</Button>
            </>
          )}
          {matchStatus.data?.actions.includes('cancel') && (
            <Button
              className='p-0.5 px-1.5 mr-1 h-7 text-sm'
              onClick={handlePatchSwapRequest}
            >
              Cancel
            </Button>
          )}
        </div>
      </Card>
    </>
  );
};

export default MatchCard;
