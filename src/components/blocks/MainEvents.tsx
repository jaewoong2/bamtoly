'use client';

import React, { Suspense, useState } from 'react';

import { useDotButton } from '@/hooks/useDotButton';
import { cn } from '@/lib/utils';

import SkeletonListItem from '../atoms/SkeletonListItem';
import { Button } from '../ui/button';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '../ui/carousel';
import EventItemList from './EventItemList';
import Mounted from './Mounted';

const tabs = [
  {
    id: '진행중 이벤트',
    title: '진행중인 이벤트',
    content: (
      <Mounted>
        {({ isViewEnter }) =>
          isViewEnter && (
            <Suspense fallback={<SkeletonListItem />}>
              <EventItemList query={{ status: 'ONGOING' }} />
            </Suspense>
          )
        }
      </Mounted>
    ),
  },
  {
    id: '예정 이벤트',
    title: '예정 이벤트',
    content: (
      <Mounted>
        {({ isViewEnter }) =>
          isViewEnter && (
            <Suspense fallback={<SkeletonListItem />}>
              <EventItemList query={{ status: 'UPCOMING' }} />
            </Suspense>
          )
        }
      </Mounted>
    ),
  },
  {
    id: '지난 이벤트',
    title: '지난 이벤트',
    content: (
      <Mounted>
        {({ isViewEnter }) =>
          isViewEnter && (
            <Suspense fallback={<SkeletonListItem />}>
              <EventItemList query={{ status: 'FINISHED' }} />
            </Suspense>
          )
        }
      </Mounted>
    ),
  },
];

const MainEvents = () => {
  const [api, setApi] = useState<CarouselApi>();
  const { onDotButtonClick, selectedIndex } = useDotButton(api);

  return (
    <Carousel setApi={setApi} className='h-full w-full'>
      <div id='tabs' className='flex w-full gap-2'>
        {tabs.map(({ title }, index) => (
          <Button
            className={cn(
              'p-0 text-sm hover:bg-transparent',
              selectedIndex === index && 'text-primary underline-offset-4'
            )}
            key={title}
            variant='ghost'
            onClick={() => onDotButtonClick(index)}
          >
            {title}
          </Button>
        ))}
      </div>
      <CarouselContent className='w-full'>
        {tabs.map(({ content, title }) => (
          <Suspense key={title} fallback={<SkeletonListItem />}>
            <CarouselItem className='relative' key={title}>
              {content}
            </CarouselItem>
          </Suspense>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default MainEvents;
