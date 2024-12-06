'use client';

import { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Event, Gifticon, Image as ImageEntitiy } from '@/atoms/types';
import DeleteDialogButton from '@/components/blocks/DeleteButton';
import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import ImageWithBackground from '@/components/ui/image-bg';
import { getYYYYMMDD } from '@/lib/time';

export const columns: ColumnDef<(Partial<Gifticon> & { eventId?: number }) | undefined>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: () => <div className='hidden' />,
    cell: () => <div className='hidden' />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'eventId',
    accessorKey: 'eventId',
    header: () => <div className='hidden' />,
    cell: () => <div className='hidden' />,
    size: 0,
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: () => <div className=''>기프이콘 이름</div>,
    cell: ({ row, getValue }) => {
      const value = row.getValue('name') as string;

      return <div className='font-medium'>{value}</div>;
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => {
      return (
        <Button className='p-0' variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          기프티콘 설명
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'claimedAt',
    header: '기프티콘 제공 날짜',
    cell: ({ row }) => {
      const claimedAt = row.getValue('claimedAt') as string;

      if (claimedAt === 'null') {
        return <div className='font-medium'>없음</div>;
      }

      return <div className='font-medium'>{claimedAt ? getYYYYMMDD(claimedAt) : '없음'}</div>;
    },
  },
  {
    accessorKey: 'message',
    header: '당첨 메시지',
    cell: ({ row }) => {
      const message = row.getValue('message') as string;

      return <div className='font-medium'>{message}</div>;
    },
  },
  {
    header: '기프티콘 이미지',
    accessorKey: 'image',
    cell: ({ row }) => {
      const image = row.getValue('image') as ImageEntitiy;

      return (
        <div className='relative h-6 w-6'>
          <ImageWithBackground
            className='font-medium'
            src={image?.imageUrl ? image?.imageUrl : '/ramram.png'}
            alt='기프티콘 이미지'
            fill
          />
        </div>
      );
    },
  },
  {
    header: '설정',
    cell: ({ row, column }) => {
      const id = row.getValue('id');
      const eventId = row.getValue('eventId') as Event;

      return (
        <div className='flex gap-4'>
          <Link
            href={`/gifticon/create?gifticonId=${id}&eventId=${eventId}`}
            className={buttonVariants({
              className: 'border shadow-none',
              size: 'sm',
              variant: 'secondary',
            })}
          >
            수정
          </Link>
          <DeleteDialogButton
            className='border shadow-none'
            size={'sm'}
            type='button'
            category={{
              type: 'gifticon',
              id: {
                gifticonId: Number(id),
                eventId: Number(eventId),
              },
            }}
          >
            삭제하기
          </DeleteDialogButton>
        </div>
      );
    },
  },
];
