'use client';

import { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

import { Event } from '@/atoms/types';
import DeleteDialogButton from '@/components/blocks/DeleteButton';
import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { getKoreanYYYYMMDD } from '@/lib/time';

export const columns: ColumnDef<Event>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: () => <div className='hidden' />,
    cell: () => <div className='hidden' />,
    enableSorting: false,
    enableHiding: false,
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
    accessorKey: 'eventName',
    header: () => <div className=''>이벤트 이름</div>,
    cell: ({ row, getValue }) => {
      const eventName = row.getValue('eventName') as string;

      return (
        <Link
          className='flex items-start gap-1 font-semibold text-blue-600 hover:underline'
          href={`/user/events/${decodeURIComponent(eventName)}`}
        >
          {eventName}
        </Link>
      );
    },
  },
  {
    accessorKey: 'eventDescription',
    header: ({ column }) => {
      return (
        <Button className='p-0' variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          이벤트 설명
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const eventDescription = row.getValue('eventDescription') as string;

      return <div className='w-full max-w-[400px] truncate'>{eventDescription}</div>;
    },
  },
  {
    accessorKey: 'eventStartDate',
    header: '시작',
    cell: ({ row }) => {
      const startDate = row.getValue('eventStartDate') as string;

      return <div className='font-medium'>{getKoreanYYYYMMDD(startDate)}</div>;
    },
  },
  {
    accessorKey: 'eventEndDate',
    header: '종료',
    cell: ({ row }) => {
      const endDate = row.getValue('eventEndDate') as string;

      return <div className='font-medium'>{getKoreanYYYYMMDD(endDate)}</div>;
    },
  },
  {
    header: '기프티콘',
    accessorKey: 'gifticons',
    cell: ({ row }) => {
      const gifticons = row.getValue('gifticons') as string;

      return <div className='font-medium'>총 {gifticons.length}개</div>;
    },
  },
  {
    header: '설정',
    cell: ({ row }) => {
      const id = row.getValue('id') as number;

      return (
        <div className='flex gap-4'>
          <Link
            href={`/event/create?eventId=${id}`}
            className={buttonVariants({
              className: 'border shadow-none',
              size: 'sm',
              variant: 'secondary',
            })}
          >
            수정
          </Link>
          <DeleteDialogButton
            category={{
              id: Number(id),
              type: 'event',
            }}
            className='border shadow-none'
            size={'sm'}
            variant={'destructive'}
          >
            삭제
          </DeleteDialogButton>
        </div>
      );
    },
  },
];
