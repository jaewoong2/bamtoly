'use client';

import { addDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { FormSchema } from '../create/page';

type Props = {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
} & React.HTMLAttributes<HTMLDivElement>;

const EventDatePicker = ({ form, className, ...props }: Props) => {
  return (
    <FormField
      control={form.control}
      name='date'
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', className)} {...props}>
          <FormLabel>이벤트 날짜</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn('w-full text-left font-normal shadow-none', !field.value && 'text-muted-foreground')}
                >
                  {field.value ? (
                    `${format(field.value.from, 'PPP', { locale: ko })} - ${format(field.value.to, 'PPP', { locale: ko })}`
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                disabled={(date) => date < addDays(new Date(), -1)}
                initialFocus
                mode='range'
                defaultMonth={field.value?.from}
                selected={field.value}
                onSelect={field.onChange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <FormDescription>이벤트의 시작날짜와 종료날짜를 선택해주세요</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EventDatePicker;
