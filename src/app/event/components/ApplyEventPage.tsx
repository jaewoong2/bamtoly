'use client';

import { useAtomValue } from 'jotai';
import { ArrowLeftIcon, Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';

import { usePostEventApply } from '@/apis/services/event/useEventService';
import { userAtom } from '@/atoms/userAtom';
import withAuth from '@/components/hoc/withAuth';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DEFAULT_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';

import AnimatedSteps from './AnimatedSteps';

type Props = {
  eventId: number;
  eventName: string;
};

const ApplyEventPage = ({ eventId, eventName }: Props) => {
  const [disabled, setDisabled] = useState(true);
  const user = useAtomValue(userAtom);
  const { replace } = useRouter();
  const { data, mutate, isError, isPending } = usePostEventApply({
    onSuccess({ data }, { userId }) {
      if (data?.isAvailable) {
        replace(`/event/${eventName}/result?eventId=${eventId}&userId=${userId}`);
      }

      if (!data?.isAvailable) {
        setDisabled(true);
      }
    },
  });

  const onClickCTAButton = () => {
    if (!user?.id) return;
    mutate({ eventId, userId: user?.id });
  };

  const onChangeIndex = useCallback((index: number) => {
    if (index + 1 === DEFAULT_LABELS.length) {
      setDisabled(false);
    }
  }, []);

  const isAvailable = useMemo(() => {
    if (data) {
      if (data.data.isAvailable) {
        return true;
      }
      return false;
    }

    if (isError) {
      return false;
    }

    return true;
  }, [data, isError]);

  const isLoading = useMemo(() => {
    return isPending;
  }, [isPending]);

  return (
    <div className='flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center max-sm:px-6'>
      <Card className='relative flex h-[300px] w-[400px] flex-col items-center justify-center rounded-lg border shadow-none max-sm:w-full'>
        <Image
          width={40}
          height={40}
          alt='무우우'
          className={cn('relative size-auto animate-wiggle-more animate-infinite', 'absolute -right-2 -top-6')}
          src={'/ramram.png'}
        />
        <CardContent className='flex h-full w-full flex-col justify-between'>
          <AnimatedSteps onChangeIndex={onChangeIndex} labels={DEFAULT_LABELS} />
          <div className={cn('grid w-full grid-cols-2 gap-5', !isAvailable && 'grid-cols-3')}>
            {!isAvailable && (
              <Link
                className={buttonVariants({ className: 'animate-fade-right px-2', variant: 'secondary' })}
                href={'/'}
              >
                <ArrowLeftIcon /> <span>돌아가기</span>
              </Link>
            )}
            <Button className='col-span-2 transition' disabled={disabled || isLoading} onClick={onClickCTAButton}>
              {isLoading ? <Loader className='animate-spin' /> : '이벤트 참여하기'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default withAuth(ApplyEventPage, { isCreator: true });
