'use client';

import React, { useState } from 'react';

import { DeleteEvnetResponse } from '@/apis/services/event/type';
import { useDeleteEvent } from '@/apis/services/event/useEventService';
import { useDeleteGifticon } from '@/apis/services/gifticon/useGifticonService';
import { DefaultResponse } from '@/lib/type';

import { Button, ButtonProps } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

interface DeleteDialogButtonProps {
  category:
    | { type: 'event'; id: number } // type이 'event'일 경우
    | { type: 'gifticon'; id: { gifticonId: number; eventId: number } }; // type이 'gifticon'일 경우
  onSuccess?: (data: DefaultResponse<DeleteEvnetResponse | null>) => void;
}

const DeleteDialogButton: React.FC<DeleteDialogButtonProps & ButtonProps> = ({
  category,
  children,
  onSuccess,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const { mutate: deleteEvent } = useDeleteEvent({ onSuccess });
  const { mutate: deleteGifticon } = useDeleteGifticon({ onSuccess });

  const title = category.type === 'event' ? '이벤트 삭제' : '기프티콘 삭제';
  const content = category.type === 'event' ? '이벤트를 삭제하시겠습니까?' : '기프티콘을 삭제하시겠습니까?';

  const onConfirm = () => {
    if (category.type === 'event') {
      deleteEvent({ eventId: category.id });
      setOpen(false);
      return;
    }

    if (category.type === 'gifticon') {
      deleteGifticon({ gifticonId: category.id.gifticonId, eventId: category.id.eventId });
      setOpen(false);
      return;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'destructive'} {...props}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{content}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant={'secondary'}>
            취소
          </Button>
          <Button onClick={onConfirm} variant={'destructive'} autoFocus>
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialogButton;
