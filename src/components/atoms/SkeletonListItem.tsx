import React from 'react';

import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const SkeletonListItem = () => {
  return (
    <div className='flex h-full w-full flex-col gap-8'>
      <Card className='flex h-[135px] w-full gap-4 p-6 shadow-none'>
        <Skeleton className='aspect-square h-[60px] w-[60px] rounded-lg' />
        <div className='flex h-full w-full flex-col gap-2'>
          <Skeleton className='h-[40px] w-[60%] rounded-sm' />
          <Skeleton className='h-[30px] w-[80%] rounded-sm' />
          <Skeleton className='h-[20px] w-[30%] rounded-sm' />
        </div>
      </Card>
      <Card className='flex h-[135px] w-full gap-4 p-6 shadow-none'>
        <Skeleton className='aspect-square h-[60px] w-[60px] rounded-lg' />
        <div className='flex h-full w-full flex-col gap-2'>
          <Skeleton className='h-[40px] w-[60%] rounded-sm' />
          <Skeleton className='h-[30px] w-[80%] rounded-sm' />
          <Skeleton className='h-[20px] w-[30%] rounded-sm' />
        </div>
      </Card>
      <Card className='flex h-[135px] w-full gap-4 p-6 shadow-none'>
        <Skeleton className='aspect-square h-[60px] w-[60px] rounded-lg' />
        <div className='flex h-full w-full flex-col gap-2'>
          <Skeleton className='h-[40px] w-[60%] rounded-sm' />
          <Skeleton className='h-[30px] w-[80%] rounded-sm' />
          <Skeleton className='h-[20px] w-[30%] rounded-sm' />
        </div>
      </Card>
      <Card className='flex h-[135px] w-full gap-4 p-6 shadow-none'>
        <Skeleton className='aspect-square h-[60px] w-[60px] rounded-lg' />
        <div className='flex h-full w-full flex-col gap-2'>
          <Skeleton className='h-[40px] w-[60%] rounded-sm' />
          <Skeleton className='h-[30px] w-[80%] rounded-sm' />
          <Skeleton className='h-[20px] w-[30%] rounded-sm' />
        </div>
      </Card>
      <Card className='flex h-[135px] w-full gap-4 p-6 shadow-none'>
        <Skeleton className='aspect-square h-[60px] w-[60px] rounded-lg' />
        <div className='flex h-full w-full flex-col gap-2'>
          <Skeleton className='h-[40px] w-[60%] rounded-sm' />
          <Skeleton className='h-[30px] w-[80%] rounded-sm' />
          <Skeleton className='h-[20px] w-[30%] rounded-sm' />
        </div>
      </Card>
    </div>
  );
};

export default SkeletonListItem;
