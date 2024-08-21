import { SeatProps } from '../../lib/types';
import { Button } from './ui/button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SeatCardSwap from './SeatCardSwap';
import { useMatchStatus } from '../hooks/queries';
import { usePostSwapRequest, usePatchSwapRequest } from '../hooks/mutations';
import React from 'react';
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

  const handleRequest: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!matchStatus.data?.swap_id) {
      handleSwapRequest();
    }
    if (!matchStatus.data?.swap_id && !matchStatus.data?.actions?.[0]) return;
    if (!matchStatus.data.swap_id) return;
    patchSwapRequest.mutate({
      body: {
        action: (e.target as HTMLButtonElement).value,
      },
      params: {
        swap_id: matchStatus.data.swap_id,
      },
    });
  };

  const handleSwapRequest = () => {
    postSwapRequest.mutate({
      body: {
        requester_seat_id: match.match[0].id,
        respondent_seat_id: match.match[1].id,
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
            {matchStatus.data?.actions &&
              matchStatus.data.actions[0] !== 'accepted' && (
                <Button
                  className='p-0.5 px-1.5 mr-1 h-7 text-sm'
                  onClick={handleRequest}
                  value={matchStatus.data.actions[0]}
                >
                  {matchStatus.data.actions[0].charAt(0).toUpperCase() +
                    matchStatus.data.actions[0].slice(1)}
                </Button>
              )}
            {matchStatus.data?.actions &&
              matchStatus.data.actions[0] === 'accepted' && (
                <div className='ml-1'>Match accepted</div>
              )}
          </>
          {matchStatus.data?.actions[1] && (
            <Button
              className='p-0.5 px-1.5 mr-1 h-7 text-sm'
              onClick={handleRequest}
              value={matchStatus.data.actions[1]}
            >
              {matchStatus.data.actions[1].charAt(0).toUpperCase() +
                matchStatus.data.actions[1].slice(1)}
            </Button>
          )}
        </div>
        <Separator />
      </div>
    </>
  );
};

export default MatchCard;
