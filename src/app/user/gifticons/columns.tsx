'use client';

import { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown } from 'lucide-react';
import Image from 'next/image';

import { Event, Gifticon } from '@/atoms/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import ImageWithBackground from '@/components/ui/image-bg';
import { getFullDate } from '@/lib/time';

export const columns: ColumnDef<Gifticon>[] = [
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
    accessorKey: 'name',
    header: () => <div className=''>기프티콘</div>,
    cell: ({ row }) => {
      const name = row.getValue('name') as string;

      return <div className='font-medium'>{name}</div>;
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => {
      return (
        <Button className='p-0' variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          설명
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const description = row.getValue('description') as string;

      return <div className='w-full max-w-[400px] truncate'>{description}</div>;
    },
  },
  {
    accessorKey: 'image',
    header: ({ column }) => {
      return <div>이미지</div>;
    },
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      const image = row.getValue('image') as Gifticon['image'];

      return <ImageWithBackground src={image?.imageUrl ?? ''} alt={name} width={24} height={24} />;
    },
  },
  {
    accessorKey: 'claimedAt',
    header: ({ column }) => {
      return <div>당첨날짜</div>;
    },
    cell: ({ row }) => {
      const claimedAt = row.getValue('claimedAt') as string;

      return <div className='w-full max-w-[400px] truncate'>{getFullDate(claimedAt)}</div>;
    },
  },
  {
    accessorKey: 'event',
    header: () => <div className=''>이벤트 이름</div>,
    cell: ({ row }) => {
      const event = row.getValue('event') as Event;

      return <div className='font-medium'>{event?.eventName}</div>;
    },
  },
];
