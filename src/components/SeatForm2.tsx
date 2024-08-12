import DeleteIcon from '@mui/icons-material/Delete';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import AircraftSeatAisle from '@/components/ui/icons/AircraftSeatAisle';
import AircraftSeatMiddle from '@/components/ui/icons/AircraftSeatMiddle';
import AircraftSeatWindow from '@/components/ui/icons/AircraftSeatWindow';
import AircraftSeatExtraLegroom from '@/components/ui/icons/AircraftSeatExtraLegroom';
import AircraftSeatReducedLegroom from '@/components/ui/icons/AircraftSeatReducedLegroom';
import AircraftFrontSection from '@/components/ui/icons/AircraftFrontSection';
import AircraftCenterSection from '@/components/ui/icons/AircraftCenterSection';
import AircraftBackSection from '@/components/ui/icons/AircraftBackSection';

import { SeatProps, LocationProps, PositionProps } from '../../lib/types';

export default function SeatForm2({
  seat,
  handleChangeSeatRowNumber,
  handleChangeSeatLetter,
  handleChangeSeatLocation,
  handleChangeSeatPosition,
  handleChangeSeatLegroom,
  handleSaveSeat,
}: //   handleEditSeat,
{
  seat: SeatProps;
  handleChangeSeatRowNumber: (newRowNumber: number) => void;
  handleChangeSeatLetter: (newLetter: string) => void;
  handleChangeSeatLocation: (newLocation: LocationProps) => void;
  handleChangeSeatPosition: (newPosition: PositionProps) => void;
  handleChangeSeatLegroom: (newExtraLegroom: boolean) => void;
  handleSaveSeat: () => void;
  //   handleEditSeat: (newSeat: SeatProps) => void;
}) {
  console.log('🚀 ~ seat:', seat);

  return (
    <div className='flex w-full  items-center gap-1.5 justify-between'>
      <div className='w-12 pb-1'>
        <Label htmlFor='number'>Number</Label>
        <Input
          type='text'
          id='number'
          value={seat.seat_row ?? ''}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeSeatRowNumber(+event.target.value);
          }}
        />
      </div>
      <div className='w-10 pb-1'>
        <Label htmlFor='letter'>Letter</Label>
        <Input
          type='text'
          id='letter'
          value={seat.seat_letter ?? ''}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeSeatLetter(event.target.value);
          }}
        />
      </div>
      <div className=' pb-1'>
        <Label htmlFor='section'>Section</Label>
        <ToggleGroup
          id='section'
          type='single'
          variant='outline'
          aria-label='Location on the plane'
          value={seat.location}
          onValueChange={(value: LocationProps) => {
            handleChangeSeatLocation(value);
          }}
        >
          <ToggleGroupItem aria-label='Front of plane' value='front'>
            <AircraftFrontSection className='w-6 h-6' />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label='Center of plane' value='center'>
            <AircraftCenterSection className='w-6 h-6' />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label='Back of plane' value='back'>
            <AircraftBackSection className='w-6 h-6' />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className=' pb-1'>
        <Label htmlFor='position'>Position</Label>
        <ToggleGroup
          variant='outline'
          id='position'
          type='single'
          aria-label='Position'
          value={seat.position}
          onValueChange={(value: PositionProps) => {
            handleChangeSeatPosition(value);
          }}
        >
          <ToggleGroupItem aria-label='Aisle Seat' value='aisle'>
            <AircraftSeatAisle className='w-6 h-6' />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label='Middle Seat' value='middle'>
            <AircraftSeatMiddle className='w-6 h-6' />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label='Window Seat' value='window'>
            <AircraftSeatWindow className='w-6 h-6' />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className=' pb-1'>
        <Label htmlFor='extraLegroom'>Extra Legroom</Label>

        <ToggleGroup
          id='extraLegroom'
          variant='outline'
          aria-label='Extra Legroom Seat'
          type='single'
          value={
            seat.extraLegroom === null
              ? undefined
              : seat.extraLegroom?.toString()
          }
          onValueChange={(value) => {
            handleChangeSeatLegroom(value === 'true');
          }}
        >
          <ToggleGroupItem value='true' aria-label='Extra Legroom Seat'>
            <AircraftSeatExtraLegroom className='w-6 h-6' />
          </ToggleGroupItem>
          <ToggleGroupItem value='false' aria-label='Reduced Legroom Seat'>
            <AircraftSeatReducedLegroom className='w-6 h-6' />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className='mt-auto pb-1'>
        <Button onClick={() => handleSaveSeat()}>Save</Button>
      </div>
    </div>
  );
}
