'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import EventCreatePage from '../components/EventCreatePage';

const CreatePage = () => {
  const search = useSearchParams();
  const { back } = useRouter();
  const eventId = search.get('eventId');

  return (
    <Dialog defaultOpen={true} onOpenChange={back}>
      <DialogContent
        className='max-h-[calc(100%-60px)] overflow-y-auto sm:max-w-[425px]'
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className='relative h-[42px]'>
          <DialogTitle>이벤트 만들기</DialogTitle>
        </DialogHeader>
        <div className='min-h-72'>
          <EventCreatePage eventId={Number(eventId)} />
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePage;
