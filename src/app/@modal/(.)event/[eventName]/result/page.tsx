'use client';

import { motion } from 'framer-motion';
import { MoveLeftIcon } from 'lucide-react';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

import { usePostGifticonClaim } from '@/apis/services/gifticon/useGifticonService';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ImageWithBackground from '@/components/ui/image-bg';

const getSearchParams = (searchParams: ReadonlyURLSearchParams, keys: string[]) =>
  keys.reduce(
    (result, key) => {
      result[key] = searchParams.get(key) ?? '';
      return result;
    },
    {} as { [key: string]: string }
  );

const AnimatedDialogContent = ({ title, description }: { title: string; description: string }) => (
  <motion.div
    className='h-10'
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogDescription>{description}</DialogDescription>
  </motion.div>
);

const ResultPage = () => {
  const { back } = useRouter();
  const { userId, eventId } = getSearchParams(useSearchParams(), ['userId', 'eventId']);
  const { mutate, data, error, isSuccess, isPending, isIdle, isError } = usePostGifticonClaim({
    eventId: +eventId,
    userId: +userId,
  });

  const debounceMutate = useDebounceCallback(mutate, 1000);

  useEffect(() => {
    if (eventId && userId) {
      debounceMutate({ eventId: +eventId, userId: +userId });
    }
  }, [debounceMutate]);

  return (
    <Dialog defaultOpen={true} onOpenChange={back}>
      <DialogContent className='sm:max-w-[425px]' onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader className='relative h-[42px]'>
          {isSuccess && (
            <AnimatedDialogContent
              title={data?.data.category !== 'LOSE' ? '당첨 되었습니다' : '다음 기회 에'}
              description={data?.data.message ?? '축하드립니다.'}
            />
          )}
          {(isPending || isIdle) && (
            <AnimatedDialogContent title='선물 상자 열어보는 중...' description='선물 상자에 뭐가 나올까요?' />
          )}
          {isError && <AnimatedDialogContent title='죄송합니다' description={error.message} />}
        </DialogHeader>
        <div className='min-h-72'>
          <ImageWithBackground
            title={data?.data.image?.name ?? '기프티콘 당첨 이미지'}
            containerClassName='h-full relative'
            src={data?.data.image?.imageUrl ?? process.env.NEXT_PUBLIC_DEFAULT_IMAGE!}
            alt={data?.data.image?.name ?? '기프티콘 당첨 이미지'}
            fill
            className='h-full max-h-full w-auto object-contain'
          />
        </div>
        <DialogFooter>
          <Button type='button' onClick={back}>
            <MoveLeftIcon />
            되돌아가기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResultPage;
