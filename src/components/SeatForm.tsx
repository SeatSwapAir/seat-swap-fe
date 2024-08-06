import DeleteIcon from '@mui/icons-material/Delete';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { SeatProps, LocationProps, PositionProps } from '../../lib/types';

export default function SeatForm({
  seat,
  handleDeleteSeat,
  handleChangeSeatRowNumber,
  handleChangeSeatLetter,
  handleChangeSeatLocation,
  handleChangeSeatPosition,
  handleChangeSeatLegroom,
}: {
  seat: SeatProps;
  flightNumber: string;
  handleUpdateSeat: (newSeat: SeatProps) => void;
  handleDeleteSeat: (id: number) => void;
  handleChangeSeatRowNumber: (id: number, newRow: number) => void;
  handleChangeSeatLetter: (id: number, newLetter: string) => void;
  handleChangeSeatLocation: (id: number, newLocation: LocationProps) => void;
  handleChangeSeatPosition: (id: number, newPosition: PositionProps) => void;
  handleChangeSeatLegroom: (id: number, newLegroom: boolean) => void;
}) {
  return (
    <>
      <div className='flex w-full  items-center gap-1.5 justify-between'>
        <div className='w-12 pb-1'>
          <Label htmlFor='number'>Number</Label>
          <Input
            type='text'
            id='number'
            value={seat.seat_row ?? ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeSeatRowNumber(seat.id, +event.target.value)
            }
          />
        </div>
        <div className='w-10 pb-1'>
          <Label htmlFor='letter'>Letter</Label>
          <Input
            type='text'
            id='letter'
            value={seat.seat_letter ?? ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeSeatLetter(seat.id, event.target.value)
            }
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
            onValueChange={(value: LocationProps) =>
              handleChangeSeatLocation(seat.id, value)
            }
          >
            <ToggleGroupItem aria-label='Front of plane' value='front'>
              <img
                src={'../../public/front2.svg'}
                alt='Front of plane'
                className='w-6 h-6'
              />
            </ToggleGroupItem>
            <ToggleGroupItem aria-label='Center of plane' value='center'>
              <img
                src={'../../public/center2.svg'}
                alt='Center of plane'
                className='w-6 h-6'
              />
            </ToggleGroupItem>
            <ToggleGroupItem aria-label='Back of plane' value='back'>
              <img src={'../../public/back2.svg'} alt='' className='w-6 h-6' />{' '}
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
            onValueChange={(value: PositionProps) =>
              handleChangeSeatPosition(seat.id, value)
            }
          >
            <ToggleGroupItem aria-label='Aisle Seat' value='aisle'>
              <img
                src={'../../public/Aircraft_Seat_Aisle.svg'}
                alt='Aisle Seat'
                className='w-6 h-6'
              />
            </ToggleGroupItem>
            <ToggleGroupItem aria-label='Middle Seat' value='middle'>
              <img
                src={'../../public/Aircraft_Seat_Middle.svg'}
                alt='Middle Seat'
                className='w-6 h-6'
              />
            </ToggleGroupItem>
            <ToggleGroupItem aria-label='Window Seat' value='window'>
              <img
                src={'../../public/Aircraft_Seat_Window.svg'}
                alt='Window Seat'
                className='w-6 h-6'
              />
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
            onValueChange={(value) =>
              handleChangeSeatLegroom(seat.id, value === 'true')
            }
          >
            <ToggleGroupItem value='true' aria-label='Extra Legroom Seat'>
              <img
                src={'../../public/Airline_Seat_Extra_Legroom.svg'}
                alt='Extra Legroom Seat'
                className='w-6 h-6'
              />
            </ToggleGroupItem>
            <ToggleGroupItem value='false' aria-label='Reduced Legroom Seat'>
              <img
                src={'../../public/Airline_Seat_Reduced_Legroom.svg'}
                alt='Reduced Legroom Seat'
                className='w-6 h-6'
              />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className='mt-auto'>
          <Button onClick={() => handleDeleteSeat(seat.id)}>
            <DeleteIcon />
          </Button>
        </div>
      </div>
    </>
  );
}
