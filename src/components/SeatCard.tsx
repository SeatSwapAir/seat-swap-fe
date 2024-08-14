import { SeatProps } from 'lib/types';

import AircraftSeatAisle from '@/components/ui/icons/AircraftSeatAisle';
import AircraftSeatMiddle from '@/components/ui/icons/AircraftSeatMiddle';
import AircraftSeatWindow from '@/components/ui/icons/AircraftSeatWindow';
import AircraftSeatExtraLegroom from '@/components/ui/icons/AircraftSeatExtraLegroom';
import AircraftSeatReducedLegroom from '@/components/ui/icons/AircraftSeatReducedLegroom';
import AircraftFrontSection from '@/components/ui/icons/AircraftFrontSection';
import AircraftCenterSection from '@/components/ui/icons/AircraftCenterSection';
import AircraftBackSection from '@/components/ui/icons/AircraftBackSection';
import { Button } from '@/components/ui/button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Separator } from '@/components/ui/separator';

const SeatCard = ({
  seat,
  handleDeleteSeat,
  handleEditSeat,
}: {
  seat: SeatProps;
  handleDeleteSeat: (seat: SeatProps) => void;
  handleEditSeat: (seat: SeatProps) => void;
}) => {
  const { seat_row, seat_letter, position, location, extraLegroom } = seat;
  return (
    <>
      <div className='flex flex-row p-0 py-2 justify-between items-center min-w-[330px]'>
        <div className='mr-3'>
          Seat {seat_row}
          {seat_letter}
        </div>
        <div className='flex flex-row items-center'>
          <div className='flex items-center p-1 mr-1 border-2 rounded-md '>
            {position === 'aisle' ? (
              <AircraftSeatAisle className='w-6 h-6' />
            ) : position === 'middle' ? (
              <AircraftSeatMiddle className='w-6 h-6' />
            ) : (
              <AircraftSeatWindow className='w-6 h-6' />
            )}
          </div>
          <div className='flex items-center p-1 mr-1 border-2 rounded-md'>
            {location === 'front' ? (
              <AircraftFrontSection className='w-6 h-6 ' />
            ) : location === 'center' ? (
              <AircraftCenterSection className='w-6 h-6  ' />
            ) : (
              <AircraftBackSection className='w-6 h-6' />
            )}
          </div>
          <div className='flex items-center p-1 mr-1 border-2 rounded-md'>
            {extraLegroom ? (
              <AircraftSeatExtraLegroom className='w-6 h-6' />
            ) : (
              <AircraftSeatReducedLegroom className='w-6 h-6' />
            )}
          </div>
        </div>

        <div className='flex items-center justify-end'>
          <Button className='w-8 h-8 mr-1'>
            <EditIcon
              onClick={() => {
                handleEditSeat(seat);
              }}
            />
          </Button>
          <Button className='w-8 h-8' onClick={() => handleDeleteSeat(seat)}>
            <DeleteIcon />
          </Button>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default SeatCard;
