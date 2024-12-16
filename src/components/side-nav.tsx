'use client';

import { GiftIcon, LogOutIcon, PartyPopperIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { useUserGetMe } from '@/apis/services/user/useUserService';
import { User } from '@/atoms/types';
import { DefaultResponse } from '@/lib/type';

import { NavUser } from './blocks/NavUser';
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
        <NavUser
          menuGroups={[
            {
              items: [
                {
                  icon: <PartyPopperIcon />,
                  item: (
                    <Link className='h-full w-full' href={`/user/events?redirectUrl=${currentPath}`}>
                      내 이벤트
                    </Link>
                  ),
                  show: user.data.provider !== 'email',
                },
                {
                  icon: <GiftIcon />,
                  item: (
                    <Link className='h-full w-full' href={`/user/gifticons?redirectUrl=${currentPath}`}>
                      받은 선물
                    </Link>
                  ),
                  show: user.data.provider !== 'email',
                },
                {
                  icon: <LogOutIcon />,
                  item: (
                    <Link className='h-full w-full' href={'/logout'} prefetch={false}>
                      로그아웃
                    </Link>
                  ),
                },
              ],
            },
          ]}
          user={{ avatar: user.data.avatar, email: user.data.email, name: user.data.userName }}
        />
      )}
      <ThemeToggle />
    </nav>
  );
};

export default SideNav;
