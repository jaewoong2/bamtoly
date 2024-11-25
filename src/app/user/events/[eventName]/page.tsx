import { revalidateTag } from 'next/cache';
import Link from 'next/link';

import eventService from '@/apis/services/event/eventService';
import gifticonService from '@/apis/services/gifticon/gifticonService';
import { Button, buttonVariants } from '@/components/ui/button';
import { NextPageProps } from '@/lib/type';

import EventDetailBreadCrumb from '../../../../components/atoms/CommonBreadCrumb';
import { DataTable } from '../components/data-table';
import { columns } from './columns';

export default async function EventDetailPage({ params }: NextPageProps<{ eventName: string }>) {
  const { eventName } = await params;
  const event = await eventService.getEvent({ eventName: eventName });

  const onClickcreateLose = async () => {
    'use server';
    await gifticonService.create({
      category: 'LOSE',
      eventId: Number(event.data?.id),
      imageUrl: '',
      name: '꽝',
      description: '꽝! 다시 한번 참여해주세요.',
      message: '꽝! 아쉬워요 다시 한번 더 참여 해주세요.',
    });
    revalidateTag('event');
  };

  return (
    <div className='container mx-auto py-10'>
      <div className='flex items-center gap-2 text-lg font-bold'>
        <div className='h-4 w-4 rounded-md bg-green-400' />
        <EventDetailBreadCrumb
          links={[{ href: '/user/events', label: '내 이벤트' }, { label: decodeURIComponent(eventName) }]}
        />
      </div>
      {event.data && (
        <DataTable
          header={
            <div className='flex gap-2'>
              <Button
                onClick={onClickcreateLose}
                className={buttonVariants({ className: 'text-sm', size: 'sm', variant: 'secondary' })}
              >
                꽝 추가하기
              </Button>
              <Link
                className={buttonVariants({ className: 'text-sm', size: 'sm', variant: 'secondary' })}
                href={`/gifticon/create?eventId=${event.data.id}`}
              >
                기프티콘 추가하기
              </Link>
            </div>
          }
          columns={columns}
          data={
            event.data.gifticons?.map((gifticon) => ({
              ...gifticon,
              eventId: event.data?.id ?? 0,
            })) ?? []
          }
        />
      )}
    </div>
  );
}
