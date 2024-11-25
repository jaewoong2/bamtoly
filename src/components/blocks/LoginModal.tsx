'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { z } from 'zod';

import { usePostApplyByEmail } from '@/apis/services/user/useUserService';
import EventInput from '@/app/event/components/EventInput';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { Form } from '../ui/form';

const FormSchema = z.object({
  email: z.string().optional(),
});

const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL;

type Props = {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean, redirectUrl?: string | null) => void;
  isApply?: boolean;

  title?: React.ReactNode;
  description?: React.ReactNode;
};

const LoginModal = ({ isOpen = true, onOpenChange, isApply, title, description }: Props) => {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirectUrl');
  const { mutate } = usePostApplyByEmail(redirectUrl);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const isValid = await form.trigger();
      const values = form.getValues();

      if (!isValid || !values.email) {
        return;
      }

      mutate(values.email);
    } catch (error) {
      console.error('Error in form submission:', error);
    }
    3;
  };

  const handleOpenChange = (isOpen: boolean) => {
    form.reset();
    onOpenChange?.(isOpen, redirectUrl);
  };

  return (
    <Dialog modal defaultOpen={false} open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className='max-h-[calc(100%-60px)] overflow-y-auto sm:max-w-[425px]'
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className='relative h-[42px]'>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className={cn('flex min-h-72 flex-col gap-4', isApply && 'min-h-36')}>
          {!isApply && (
            <>
              <Form {...form}>
                <form className='flex w-full flex-col items-end gap-4' onSubmit={handleEmailSubmit}>
                  <EventInput
                    container={{ className: 'w-full ' }}
                    label='이메일'
                    form={form}
                    formKey='email'
                    required={false}
                    as='input'
                    description='당첨자 확인을 위해 이메일을 등록 해주세요'
                  />
                  <Button type='submit' className='w-full'>
                    등록하기
                  </Button>
                </form>
              </Form>
              <div className='relative mx-auto my-4 h-[1px] w-[90%] bg-[#d9d9d9]'>
                <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-xs'>
                  이벤트도 만들고 싶다면?
                </span>
              </div>
            </>
          )}
          <div className={cn('flex flex-col items-center justify-center gap-4', isApply && 'my-4')}>
            <Link
              href={`${backendurl}/api/auth/google/login`}
              target='_blank'
              rel='noreferrer'
              className={cn(
                'flex w-full items-center justify-center gap-4 rounded-full border bg-white px-3 py-2 dark:bg-black'
              )}
            >
              <FcGoogle className='h-6 w-6' />
              <span className='text-xs'>구글 로그인하기</span>
            </Link>
            <Link
              href={`${backendurl}/api/auth/kakao/login`}
              className={cn(
                'flex w-full items-center justify-center gap-4 rounded-full border bg-yellow-300 px-3 py-2 dark:bg-black'
              )}
            >
              <RiKakaoTalkFill className='h-6 w-6' />
              <span className='text-xs'>카카오 로그인하기</span>
            </Link>
          </div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
