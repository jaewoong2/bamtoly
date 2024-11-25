'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { useUserGetMe } from '@/apis/services/user/useUserService';

import LoginModal from '../blocks/LoginModal';

function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: {
    isCreator?: boolean;
  }
) {
  return (props: P) => {
    const { back, push } = useRouter();
    const { data: user } = useUserGetMe();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onOpenChange = (isOpen: boolean, redirectUrl?: string | null) => {
      setIsDialogOpen(isOpen);
      if (!isOpen) {
        redirectUrl ? push(redirectUrl) : back();
      }
    };

    useEffect(() => {
      if (!user?.data?.id) {
        setIsDialogOpen(true);
      }
    }, [user]);

    if (!user?.data?.id) {
      return (
        <LoginModal
          title={options?.isCreator ? '로그인' : '이벤트 참여하기'}
          description={
            options?.isCreator ? '서비스 이용을 위해 로그인해 주세요' : '즐거운 이벤트 참여를 위해 등록해 주세요'
          }
          isApply={options?.isCreator}
          isOpen={isDialogOpen}
          onOpenChange={onOpenChange}
        />
      );
    }

    return <WrappedComponent {...props} user={user} />;
  };
}

export default withAuth;
