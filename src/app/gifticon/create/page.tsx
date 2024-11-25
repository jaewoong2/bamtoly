'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import GifticonCreate from '../components/GifticonCreate';

const GifticonCreateModal = () => {
  const { back } = useRouter();

  return (
    <Dialog defaultOpen={true} onOpenChange={back}>
      <DialogContent
        className='max-h-[calc(100%-60px)] overflow-y-auto sm:max-w-[425px]'
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className='relative h-[42px]'>
          <DialogTitle>기프티콘 만들기</DialogTitle>
        </DialogHeader>
        <div className='min-h-72'>
          <GifticonCreate />
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GifticonCreateModal;
