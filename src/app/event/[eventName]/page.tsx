import { redirect } from 'next/navigation';
import React from 'react';

import eventService from '@/apis/services/event/eventService';
import userService from '@/apis/services/user/userService';
import RedirectWithToast from '@/components/blocks/RedirectWithToast';
import { NextPageProps } from '@/lib/type';

import ApplyEventPage from '../components/ApplyEventPage';

type Props = {
  eventName: string;
};

const EventPage = async ({ params }: NextPageProps<Props>) => {
  const { eventName } = await params;
  const event = await eventService.getEventParticipate({ eventName: decodeURIComponent(eventName) });

  const user = await userService.getMe();
  const status = await eventService.getEventStatus(event.data?.id, user.data?.id);

  if (!status.data?.isAvailable) {
    return <RedirectWithToast redirectUrl='/' toastMessage={status.data?.message} />;
  }

  return event.data?.id ? <ApplyEventPage eventId={event.data?.id} eventName={eventName} /> : null;
};

export default EventPage;
