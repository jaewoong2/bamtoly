import Link from 'next/link';
import React from 'react';

import { Card } from '../ui/card';
import ImageWithBackground from '../ui/image-bg';
import EventApplyCTACard from './EventApplyCTACard';

const MainRightSection = () => {
  return (
    <div className='sticky top-[64px] flex h-full w-full flex-col gap-2'>
      <div className='h-7 max-md:hidden' />
      <div className='max-md:hidden'>
        <EventApplyCTACard />
      </div>
      <Card className='relative h-[360px] overflow-hidden border-none bg-transparent shadow-none max-md:h-[240px]'>
        <Link href={'https://naver.me/5wWu4h6f'} target='_blank' referrerPolicy='no-referrer'>
          <ImageWithBackground
            background={false}
            as='simple'
            containerClassName='h-full relative'
            src={'https://images.bamtoly.com/images/juin.png'}
            alt='설문 작성 부탁드려요'
            fill
            className='h-full max-h-full w-auto object-contain'
          />
        </Link>
      </Card>
    </div>
  );
};

export default MainRightSection;
