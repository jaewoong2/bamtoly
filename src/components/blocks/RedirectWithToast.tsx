'use client';

import { Loader2Icon, LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { useToast } from '@/hooks/use-toast';

interface Props {
  redirectUrl?: string;
  toastTitle?: string;
  toastMessage?: string;
  toastType?: 'success' | 'error' | 'info';
}

const RedirectWithToast = ({
  redirectUrl = '/',
  toastMessage = '리다이렉트 중입니다.',
  toastTitle = '이벤트에 참여 할 수 없습니다.',
}: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      toast({
        title: toastTitle,
        description: toastMessage,
      });
    }, 0);

    const redirectTimeout = setTimeout(() => {
      router.replace(redirectUrl);
    }, 100);

    return () => {
      clearTimeout(timeout);
      clearTimeout(redirectTimeout);
    };
  }, [toast]);

  return (
    <div className='flex min-h-[200px] items-center justify-center'>
      <div className='text-center'>
        <div className='flex w-full items-center justify-center'>
          <LoaderIcon className='animate-spin' />
        </div>
        <button onClick={() => router.push(redirectUrl)} className='text-sm text-blue-500 hover:underline'>
          수동으로 이동하기
        </button>
      </div>
    </div>
  );
};

export default RedirectWithToast;
