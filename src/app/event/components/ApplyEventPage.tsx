'use client';

import { useAtomValue } from 'jotai';
import { ArrowLeftIcon, Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

import { usePostEventApply } from '@/apis/services/event/useEventService';
import { Block as BlockType } from '@/atoms/types';
import { userAtom } from '@/atoms/userAtom';
import { Block } from '@/components/blocks/Block';
import withAuth from '@/components/hoc/withAuth';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DEFAULT_BLOCKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

type Props = {
  eventId: number;
  eventName: string;
  blocks: BlockType[];
};

const ApplyEventPage = ({ eventId, eventName, blocks = DEFAULT_BLOCKS }: Props) => {
  const user = useAtomValue(userAtom);
  const { replace } = useRouter();
  const { data, mutate, isError, isPending } = usePostEventApply({
    onSuccess({ data }, { userId }) {
      if (data?.isAvailable) {
        replace(`/event/${eventName}/result?eventId=${eventId}&userId=${userId}`);
      }
    },
  });

  const onClickCTAButton = () => {
    if (!user?.id) return;
    mutate({ eventId, userId: user?.id });
  };

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
          <div className='flex h-full w-full flex-col justify-between pt-10'>
            {blocks.map((block, index) => (
              <Block
                key={block.id + `${index}`}
                block={block}
                isAvailable={isAvailable}
                isLoading={isLoading}
                onClickCTAButton={onClickCTAButton}
              >
                {(element) => element}
              </Block>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default withAuth(ApplyEventPage, { isCreator: true });
