'use client';

import { useAtom } from 'jotai';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useMemo, useState } from 'react';

import { GetAllEventsQuery } from '@/apis/services/event/type';
import { useInfiniteGetAllEvents } from '@/apis/services/event/useEventService';
import { selectedEventAtom } from '@/atoms/selectedEventAtom';
import { Event } from '@/atoms/types';

import EventItem from '../atoms/EventItem';
import { Button } from '../ui/button';
import { CardDescription } from '../ui/card';
import EventApplyCTAButton from './EventApplyCTAButton';

type Props = {
  query?: GetAllEventsQuery;
};

const EventItemList = ({ query }: Props) => {
  const { data, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage } = useInfiniteGetAllEvents({
    initialPageParam: { page: 1 },
    params: { ...query },
  });
  const [currentPage, setCurrentPage] = useState(1);

  const events = useMemo(() => {
    return data?.pages[currentPage - 1]?.data.data;
  }, [data, currentPage]);

  const [selectedEvent, setSelectedEvent] = useAtom(selectedEventAtom);

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
  };

  const onClickNextPage = () => {
    if (!data?.pages[currentPage - 1].data.meta?.hasNextPage) {
      return;
    }
    setCurrentPage((prev) => prev + 1);

    if (!hasNextPage) {
      return;
    }
    fetchNextPage();
  };
  const onClickPrevPage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage((prev) => prev - 1);

    if (!hasPreviousPage) {
      return;
    }
    fetchPreviousPage();
  };

  return (
    <div className='flex flex-col gap-4'>
      {events?.length === 0 && (
        <div className='flex items-center justify-center py-10 text-sm text-muted-foreground'>
          등록된 이벤트가 없어요
        </div>
      )}
      {events?.map((event) => (
        <EventItem
          onClickItem={() => handleSelectEvent(event)}
          key={event.id}
          endDate={event.eventEndDate}
          startDate={event.eventStartDate}
          totalGifticons={event.gifticons?.length}
          gifticonsLength={event.gifticons?.filter((gifticon) => gifticon && gifticon?.category !== 'LOSE').length}
          thumbnails={event?.thumbnails}
          title={event.eventName}
          description={selectedEvent?.id === event.id && <CardDescription>{event.eventDescription}</CardDescription>}
          footer={selectedEvent?.id === event.id && <EventApplyCTAButton className='w-fit' />}
        />
      ))}
      {events && events?.length > 0 && (
        <div className='flex w-full justify-end gap-2'>
          <Button size={'sm'} onClick={onClickPrevPage} disabled={currentPage === 1}>
            <ArrowLeft />
          </Button>
          <Button
            size={'sm'}
            onClick={onClickNextPage}
            disabled={!data?.pages[currentPage - 1]?.data.meta?.hasNextPage}
          >
            <ArrowRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventItemList;
