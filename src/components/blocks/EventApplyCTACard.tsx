import { useAtomValue } from 'jotai';
import React from 'react';

import { selectedEventAtom } from '@/atoms/selectedEventAtom';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import EventApplyCTAButton from './EventApplyCTAButton';

const EventApplyCTACard = () => {
  const selectedEvent = useAtomValue(selectedEventAtom);

  return (
    <Card className='flex min-h-48 w-full flex-col justify-between shadow-none'>
      <CardHeader>
        <CardTitle>{selectedEvent?.eventName ?? '기프티콘이 기다리고 있어요!'}</CardTitle>
        <CardDescription>
          {selectedEvent?.eventDescription ?? '이벤트에 참여해서 기프티콘을 받아가시는건 어떨까요 😎'}
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className='flex w-full justify-between'>
        <EventApplyCTAButton />
      </CardFooter>
    </Card>
  );
};

export default EventApplyCTACard;
