'use client';

import { useAtomValue } from 'jotai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { userAtom } from '@/atoms/userAtom';

import { buttonVariants } from '../ui/button';
import { Card } from '../ui/card';
import ImageWithBackground from '../ui/image-bg';
import EventApplyCTACard from './EventApplyCTACard';

const MainRightSection = () => {
  const user = useAtomValue(userAtom);
  const currentPath = usePathname();

  return (
    <div className='sticky top-[64px] flex h-full w-full flex-col gap-2'>
      <div className='h-9'>
        <Card className='flex h-full w-full items-center justify-center rounded-md border shadow-none'>
          <Link href={`/user/events?redirectUrl=${currentPath}`} className={buttonVariants({ className: 'w-full' })}>
            {user?.id ? '이벤트 관리하기' : '이벤트 만들기'}
          </Link>
        </Card>
      </div>
      <div className='max-md:hidden'>
        <EventApplyCTACard />
      </div>
      <Card className='relative h-[360px] overflow-hidden max-md:h-[240px]'>
        <ImageWithBackground
          containerClassName='h-full relative'
          src={'/rabbit.png'}
          alt='Rabbit'
          fill
          className='h-full max-h-full w-auto object-contain'
        />
      </Card>
    </div>
  );
};

export default MainRightSection;
