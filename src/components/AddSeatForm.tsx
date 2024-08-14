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
import { useState } from 'react';
import { CardDescription, CardHeader, CardTitle } from './ui/card';

export default function AddSeatForm({
  handleAddSeat,
}: {
  handleAddSeat: (seat: SeatProps) => void;
}) {
  const [seat, setSeat] = useState<SeatProps>({
    id: Math.floor(Math.random() * 1000000000),
    extraLegroom: null,
    location: '' as LocationProps,
    position: '' as PositionProps,
    seat_letter: null,
    seat_row: null,
    previous_user_name: null,
    previous_user_id: null,
  });
  console.log('🚀 ~ file: AddSeatForm.tsx:32 ~ seat:', seat);
  const { extraLegroom, location, position, seat_letter, seat_row } = seat;
  return (
    <div className='p-4 flex flex-col gap-4 items-start min-w-[330px]'>
      <CardHeader>
        <CardTitle>Adding new seat!</CardTitle>
        <CardDescription>
          Enter seat's number, letter and other details
        </CardDescription>
      </CardHeader>
      <div className='flex w-full gap-1.5 '>
        <div className='w-20 pb-1'>
          <Label htmlFor='number'>Number</Label>
          <Input
            type='text'
            id='number'
            value={seat.seat_row ?? ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSeat({ ...seat, seat_row: +event.target.value });
            }}
          />
        </div>
        <div className='w-20 pb-1'>
          <Label htmlFor='letter'>Letter</Label>
          <Input
            type='text'
            id='letter'
            value={seat.seat_letter ?? ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSeat({ ...seat, seat_letter: event.target.value });
            }}
          />
        </div>
        <div className='mt-auto mb-3'>
          {!(seat_letter && seat_row) ? 'Select Seat' : ''}
        </div>
      </div>
      <div className=' pb-1 flex flex-col items-start'>
        <Label htmlFor='section' className='mb-1'>
          Location
        </Label>
        <div className='flex items-center gap-1.5'>
          <ToggleGroup
            id='section'
            type='single'
            variant='outline'
            aria-label='Location on the plane'
            value={location}
            onValueChange={(value: LocationProps) => {
              setSeat({ ...seat, location: value });
            }}
          >
            <ToggleGroupItem aria-label='Front of plane' value='front'>
              <AircraftFrontSection className='w-7 h-6' />
            </ToggleGroupItem>
            <ToggleGroupItem aria-label='Center of plane' value='center'>
              <AircraftCenterSection className='w-7 h-6' />
            </ToggleGroupItem>
            <ToggleGroupItem aria-label='Back of plane' value='back'>
              <AircraftBackSection className='w-7 h-6' />
            </ToggleGroupItem>
          </ToggleGroup>
          <div>
            {location === ''
              ? 'Select Location'
              : location === 'front'
              ? 'Front of Plane'
              : location === 'center'
              ? 'Center of Plane'
              : 'Back of Plane'}
          </div>
        </div>
      </div>
      <div className=' pb-1 flex flex-col items-start'>
        <Label htmlFor='position' className='mb-1'>
          Position
        </Label>
        <div className='flex items-center gap-1.5'>
          <ToggleGroup
            variant='outline'
            id='position'
            type='single'
            aria-label='Position'
            value={position}
            onValueChange={(value: PositionProps) => {
              setSeat({ ...seat, position: value });
            }}
          >
            <ToggleGroupItem aria-label='Aisle Seat' value='aisle'>
              <AircraftSeatAisle className='w-7 h-6' />
            </ToggleGroupItem>
            <ToggleGroupItem aria-label='Middle Seat' value='middle'>
              <AircraftSeatMiddle className='w-7 h-6' />
            </ToggleGroupItem>
            <ToggleGroupItem aria-label='Window Seat' value='window'>
              <AircraftSeatWindow className='w-7 h-6' />
            </ToggleGroupItem>
          </ToggleGroup>
          <div>
            {position === ''
              ? 'Select Position'
              : position === 'aisle'
              ? 'Aisle Seat'
              : position === 'middle'
              ? 'Middle Seat'
              : 'Window Seat'}
          </div>
        </div>
      </div>
      <div className=' pb-1 flex flex-col items-start'>
        <Label htmlFor='extraLegroom' className='mb-1'>
          Legroom
        </Label>
        <div className='flex items-center gap-1.5'>
          <ToggleGroup
            id='extraLegroom'
            variant='outline'
            aria-label='Extra Legroom Seat'
            type='single'
            value={extraLegroom === null ? undefined : extraLegroom?.toString()}
            onValueChange={(value) => {
              setSeat({ ...seat, extraLegroom: value === 'true' });
            }}
          >
            <ToggleGroupItem value='true' aria-label='Extra Legroom Seat'>
              <AircraftSeatExtraLegroom className='w-14 h-6' />
            </ToggleGroupItem>
            <ToggleGroupItem value='false' aria-label='Reduced Legroom Seat'>
              <AircraftSeatReducedLegroom className='w-14 h-6' />
            </ToggleGroupItem>
          </ToggleGroup>

          {extraLegroom === null
            ? 'Select Legroom'
            : extraLegroom
            ? 'Extra'
            : 'Reduced '}
        </div>
      </div>
      <div className='mt-auto py-2 '>
        <Button className='w-[330px]' onClick={() => handleAddSeat(seat)}>
          Save Seat
        </Button>
      </div>
    </div>
  );
}
