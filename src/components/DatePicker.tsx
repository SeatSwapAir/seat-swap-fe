'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { UpdateDisabledTwoTone } from '@mui/icons-material';
import { useState } from 'react';

export function DatePicker2({
  handleDateChange,
}: {
  handleDateChange: (date: Date) => void;
}) {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const updateDate = (selected: Date | undefined) => {
    setDate(selected);
    if (selected) {
      handleDateChange(selected);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={updateDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
