'use client';

import { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { boolean } from 'zod';

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
    header: () => <div className=''>선물</div>,
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
          선물 설명
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'claimedBy',
    header: '선물 당첨자',
    cell: ({ row }) => {
      const claimedBy = row.getValue('claimedBy') as Gifticon['claimedBy'];

      if (!claimedBy) {
        return <div className='font-medium'>없음</div>;
      }

      return <div className='font-medium'>{claimedBy.email ? claimedBy.email : '없음'}</div>;
    },
  },
  {
    accessorKey: 'claimedAt',
    header: '선물 제공 날짜',
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
    header: '선물 이미지',
    accessorKey: 'image',
    cell: ({ row }) => {
      const image = row.getValue('image') as ImageEntitiy;

      return (
        <div className='relative h-6 w-6'>
          <ImageWithBackground
            containerClassName='relative w-6 h-6'
            className='font-medium'
            src={image?.imageUrl ? image?.imageUrl : process.env.NEXT_PUBLIC_DEFAULT_IMAGE!}
            alt='선물 이미지'
            fill
            sizes='6'
            // width={24}
            // height={24}
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
      const claimedAt = row.getValue('claimedAt') as string;

      return (
        <div className='flex gap-4'>
          <Link
            aria-readonly={claimedAt ? true : false}
            href={claimedAt ? `#` : `/gifticon/create?gifticonId=${id}&eventId=${eventId}`}
            className={buttonVariants({
              className: 'border shadow-none aria-readonly:cursor-default aria-readonly:opacity-50',
              size: 'sm',
              variant: 'secondary',
            })}
          >
            수정
          </Link>
          <DeleteDialogButton
            disabled={claimedAt ? true : false}
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
