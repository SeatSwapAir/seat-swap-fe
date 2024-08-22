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
import { useDeleteSeat } from '@/hooks/mutations';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';

const SeatCard = ({
  seat,
  handleEditSeat,
  setShowAddSeatForm,
}: {
  seat: SeatProps;
  handleEditSeat: (seat: SeatProps) => void;
  setShowAddSeatForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { id, seat_row, seat_letter, position, location, extraLegroom } = seat;

  const mutateDeleteSeat = useDeleteSeat(seat.current_user_id, seat.flight_id);

  const handleDeleteSeat = (): void | SeatProps => {
    mutateDeleteSeat.mutate({
      seat_id: id,
    });
  };
  return (
    <>
      <div className='flex flex-row p-2 justify-between items-center min-w-[330px]'>
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
          <Button
            disabled={seat.previous_user_id !== null}
            className='w-8 h-8 mr-1'
          >
            <EditIcon
              onClick={() => {
                handleEditSeat(seat);
                setShowAddSeatForm(false);
              }}
            />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={seat.previous_user_id !== null}
                className='w-8 h-8'
              >
                <DeleteIcon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this seat?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                This will delete the seat and all requests.
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button variant='outline'>Cancel</Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    variant='destructive'
                    onClick={() => handleDeleteSeat()}
                  >
                    Delete Seat!
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default SeatCard;
