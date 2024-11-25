import { Event, User } from '@/atoms/types';

export type CreateEventParams = {
  maxParticipants: number;
  totalGifticons: number;
  eventName: string;
  images?: string[];
  eventDescription: string;
  eventStartDate: Date;
  eventEndDate: Date;
  repetition: number;
  eventId?: Event['id'];
};

export type CreateEventRespomse = {
  message: string;
  eventId: number;
};

export type GetEventQuery = {
  eventId?: number;
  eventName?: string;
  userName?: string;
};

export type GetAllEventsQuery = {
  readonly startDate?: Event['eventStartDate'];
  readonly endDate?: Event['eventEndDate'];
  readonly name?: Event['eventName'];
  readonly description?: Event['eventDescription'];
  readonly status?: 'UPCOMING' | 'ONGOING' | 'FINISHED';
  readonly userName?: string;
  readonly take?: number;
};

export type GetEventStatusResponse = {
  isAvailable: boolean;
  message: string;
};

export type PostApplyEventRequset = {
  eventId: Event['id'];
  userId: User['id'];
};

export type PostApplyEventResponse = {
  isAvailable: boolean;
  message: string;
  userId?: User['id'];
};

export type PostDarwEventResponse = {
  isWinner: boolean;
  message: string;
  userId: User['id'];
  eventId: Event['id'];
};

export type DeleteEvnetRequest = {
  eventId: Event['id'];
};

export type DeleteEvnetResponse = {
  eventId: Event['id'];
  message: string;
};

export type UpdateEventRequest = Partial<CreateEventParams> & { eventId?: Event['id'] };

export type UpdateEventResponse = {
  message: string;
  eventId: number;
};
