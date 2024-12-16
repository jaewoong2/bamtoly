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
          {/* <Image width={30} height={20} alt='Bamtoly-logo' className={cn('relative size-auto')} src={ process.env.NEXT_PUBLIC_DEFAULT_IMAGE} /> */}
        </div>
        <span className='relative inline-block font-bold'>
          <Image src={siteConfig.logo} alt='밤토리' width={60} height={55} className='w-auto' />
        </span>
      </Link>
    </div>
  );
}
