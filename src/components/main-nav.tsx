import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function MainNav() {
  return (
    <div className='flex gap-6 md:gap-10'>
      <Link href='/' className='flex items-center space-x-2'>
        <div className='relative flex items-end justify-center'>
          <Image width={20} height={20} alt='무우우' className={cn('relative size-auto')} src={'/ramram.png'} />
        </div>
        <span className='inline-block font-bold'>{siteConfig.name}</span>
      </Link>
    </div>
  );
}
