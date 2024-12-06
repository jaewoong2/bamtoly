import { useAtomValue } from 'jotai';
import { LoaderCircle, LoaderIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';

import { useGetEventStatus } from '@/apis/services/event/useEventService';
import { selectedEventAtom } from '@/atoms/selectedEventAtom';
import { userAtom } from '@/atoms/userAtom';
import { cn } from '@/lib/utils';

import { Button, ButtonProps, buttonVariants } from '../ui/button';

const EventApplyCTAButton = ({ className, ...props }: ButtonProps & React.RefAttributes<HTMLButtonElement>) => {
  const selectedEvent = useAtomValue(selectedEventAtom);
  const user = useAtomValue(userAtom);

  const { data, isLoading } = useGetEventStatus(
    { eventId: selectedEvent?.id, userId: user?.id },
    {
      placeholderData: (data) => {
        return data;
      },
    }
  );

  const [showSpinner, setShowSpinner] = useState(false);

  const onClickApplyButton = () => {
    if (!selectedEvent?.id) return;
  };

  const ButtonMessage = useMemo(() => {
    if (showSpinner) {
      return <LoaderIcon className='animate-spin' />;
    }

    if (data?.data?.message) {
      return data?.data?.message;
    }

    return '이벤트 참여하기';
  }, [data?.data?.message, user, showSpinner]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showSpinner) {
      timer = setTimeout(() => setShowSpinner(false), 300);
    }

    if (isLoading) {
      setShowSpinner(true);
    }

    return () => clearTimeout(timer); // Cleanup timeout on unmount or isLoading change
  }, [isLoading, showSpinner]);

  return (
    <>
      {/* First component: When event is not available */}
      {user && !data?.data?.isAvailable && (
        <Button
          className={buttonVariants({
            className: cn('w-full whitespace-normal', className),
            ...props,
          })}
          disabled
        >
          {ButtonMessage}
        </Button>
      )}
      {!user && (
        <Link
          className={buttonVariants({
            className: cn('w-full whitespace-normal', className),
            ...props,
          })}
          href={`/auth?redirectUrl=/event/${selectedEvent?.eventName}`}
        >
          이메일 등록 하고 이벤트 참여하기
        </Link>
      )}
      {data?.data?.isAvailable && (
        <Link
          className={buttonVariants({ className: cn('w-full', className), ...props })}
          href={`/event/${selectedEvent?.eventName}`}
          onClick={onClickApplyButton}
        >
          {ButtonMessage}
        </Link>
      )}
    </>
  );
};

export default EventApplyCTAButton;
