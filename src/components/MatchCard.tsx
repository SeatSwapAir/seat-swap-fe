import { SeatProps } from '../../lib/types';
import { Button } from './ui/button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SeatCardSwap from './SeatCardSwap';
import { useMatchStatus } from '../hooks/queries';
import { usePostSwapRequest, usePatchSwapRequest } from '../hooks/mutations';
import { Separator } from './ui/separator';

const MatchCard = (match: { match: SeatProps[] }) => {
  const matchStatus = useMatchStatus(match.match[0].id, match.match[1].id);
  const postSwapRequest = usePostSwapRequest(
    match.match[0].id,
    match.match[1].id
  );
  const patchSwapRequest = usePatchSwapRequest(
    match.match[0].id,
    match.match[1].id
  );
  const handleCancel = () => {
    if (!matchStatus?.data?.swap_id) return;
    patchSwapRequest.mutate({
      body: {
        action: 'cancel',
      },
      params: {
        swap_id: matchStatus.data.swap_id,
      },
    });
  };

  const handleAccept = () => {
    if (!matchStatus?.data?.swap_id) return;
    patchSwapRequest.mutate({
      body: {
        action: 'accept',
      },
      params: {
        swap_id: matchStatus.data.swap_id,
      },
    });
  };

  const handleReject = () => {
    if (!matchStatus?.data?.swap_id) return;
    patchSwapRequest.mutate({
      body: {
        action: 'reject',
      },
      params: {
        swap_id: matchStatus.data.swap_id,
      },
    });
  };

  const handleRequest = () => {
    if (!matchStatus?.data?.swap_id) {
      postSwapRequest.mutate({
        body: {
          requester_seat_id: match.match[0].id,
          respondent_seat_id: match.match[1].id,
        },
      });
      return;
    }
    patchSwapRequest.mutate({
      body: {
        action: 'request',
      },
      params: {
        swap_id: matchStatus.data.swap_id,
      },
    });
  };

  return (
    <>
      <div className='flex flex-col md:min-w-[450px]'>
        <div className='flex flex-row items-center md:justify-between md:min-w-[450px] py-2'>
          <div className='text-lg'>
            <span className='hidden lg:inline-block mr-1'>Seat </span>
            {match.match[0].seat_row}
            {match.match[0].seat_letter}
          </div>
          <span className='mb-1'>
            <ArrowForwardIcon />
          </span>
          <SeatCardSwap seat={match.match[1]} />
          <>
            {matchStatus.data?.actions[0] === 'accept' && (
              <>
                <Button
                  className='p-0.5 px-1.5 mr-1 h-7 text-sm'
                  onClick={handleAccept}
                  value='accept'
                >
                  Accept
                </Button>
                <Button
                  className='p-0.5 px-1.5 mr-1 h-7 text-sm'
                  onClick={handleReject}
                  value='reject'
                >
                  Reject
                </Button>
              </>
            )}
            {matchStatus.data?.actions[0] === 'cancel' && (
              <Button
                className='p-0.5 px-1.5 mr-1 h-7 text-sm'
                onClick={handleCancel}
                value='cancel'
              >
                Cancel
              </Button>
            )}
            {matchStatus.data?.actions[0] === 'request' && (
              <Button
                className='p-0.5 px-1.5 mr-1 h-7 text-sm'
                onClick={handleRequest}
                value='request'
              >
                Request
              </Button>
            )}
          </>
        </div>
        <Separator />
      </div>
    </>
  );
};

export default MatchCard;
