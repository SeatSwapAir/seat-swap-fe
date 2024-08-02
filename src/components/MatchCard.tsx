import { SeatProps } from '../../lib/types';
import { Card } from '@/components/ui/card';
import { Button } from './ui/button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SeatCardSwap from './SeatCardSwap';
import { useMatchStatus } from '../hooks/queries';
import { usePostSwapRequest, usePatchSwapRequest } from '../hooks/mutations';
import React from 'react';

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
    console.log((e.target as HTMLButtonElement).value);
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
      <Card className='w-fit flex flex-row'>
        <div className='flex flex-row items-center'>
          <SeatCardSwap seat={match.match[0]} />
          <span className='mb-1'>
            <ArrowForwardIcon />
          </span>
          <SeatCardSwap seat={match.match[1]} />
          <div>{match.match[0].id + ' - ' + match.match[1].id}</div>
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
      </Card>
    </>
  );
};

export default MatchCard;
