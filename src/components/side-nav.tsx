'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { useUserGetMe } from '@/apis/services/user/useUserService';
import { User } from '@/atoms/types';
import { DefaultResponse } from '@/lib/type';

import { ThemeToggle } from './theme-toggle';
import { buttonVariants } from './ui/button';

type Props = {
  user: DefaultResponse<User | null, any>;
};

const SideNav = ({ user: user_ }: Props) => {
  const { data: user } = useUserGetMe();
  const currentPath = usePathname();

  return (
    <nav className='flex items-center gap-3 space-x-1'>
      {!user?.data?.id && (
        <Link href={`/auth?redirectUrl=${currentPath}`}>
          <div
            className={buttonVariants({
              size: 'icon',
              variant: 'ghost',
            })}
          >
            로그인
            <span className='sr-only'>로그인</span>
          </div>
        </Link>
      )}
      {user?.data?.id && (
        <Link href={`/logout?redirectUrl=${currentPath}`}>
          <div
            className={buttonVariants({
              size: 'icon',
              variant: 'ghost',
              className: 'w-fit px-1',
            })}
          >
            <div className='flex items-center justify-center gap-1'>로그아웃</div>
            <span className='sr-only'>로그아웃</span>
          </div>
        </Link>
      )}
      <ThemeToggle />
    </nav>
  );
};

export default SideNav;
