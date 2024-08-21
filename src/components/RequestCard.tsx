import { SeatProps } from '../../lib/types';
import { Button } from './ui/button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SeatCardSwap from './SeatCardSwap';
import { useMatchStatus } from '../hooks/queries';
import { usePostSwapRequest, usePatchSwapRequest } from '../hooks/mutations';
import React from 'react';
import { Separator } from './ui/separator';

const RequestCard = (match: { match: SeatProps[] }) => {
  const matchStatus = useMatchStatus(match.match[0].id, match.match[1].id);

  const patchSwapRequest = usePatchSwapRequest(
    match.match[0].id,
    match.match[1].id
  );

  const handleRequest: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!matchStatus.data?.swap_id) return;
    patchSwapRequest.mutate({
      body: {
        action: (e.target as HTMLButtonElement).value,
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
          <Button
            className='p-0.5 px-1.5 mr-1 h-7 text-sm'
            onClick={handleRequest}
            value='cancel'
          >
            Cancel
          </Button>
        </div>
        <Separator />
      </div>
    </>
  );
};

export default RequestCard;
