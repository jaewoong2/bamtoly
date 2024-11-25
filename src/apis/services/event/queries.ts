'use client';

import { UseMutationOptions } from '@tanstack/react-query';

import { Event } from '@/atoms/types';
import { DefaultResponse, GetInfinityResponse } from '@/lib/type';
import { buildQueryParams } from '@/lib/utils';

import eventService from './eventService';
import {
  CreateEventParams,
  DeleteEvnetRequest,
  GetAllEventsQuery,
  GetEventQuery,
  PostApplyEventRequset,
  UpdateEventRequest,
} from './type';

const queryKeys = {
  getAllEvents: (params: GetAllEventsQuery) => ['getAllEvents', buildQueryParams(params)] as const,
  getEvent: (query: GetEventQuery) => ['getEvent', buildQueryParams(query)] as const,
  getEventStatus: (eventId?: number, userId?: number) => ['getStatus', eventId, userId] as const,
  postEventApply: (eventId?: number, userId?: number) => ['apply', eventId, userId] as const,
};

const queryOptions = {
  createEvent: () => ({
    mutationFn: (body: CreateEventParams) => eventService.createEvent(body),
  }),

  getEvent: (query: GetEventQuery) => ({
    queryKey: queryKeys.getEvent(query),
    queryFn: () => eventService.getEvent(query),
  }),

  getAllEvents: (params: GetAllEventsQuery) => ({
    queryKey: queryKeys.getAllEvents(params),
    queryFn: ({ pageParam }: { pageParam: { page: number } }) => eventService.getAllEvents(pageParam.page, {}, params),
    getNextPageParam: (lastPage: GetInfinityResponse<Event[] | undefined>) => {
      return lastPage?.data?.meta?.hasNextPage ? { page: lastPage?.data.meta.page + 1 } : null;
    },
    getPreviousPageParam: (firstPage: GetInfinityResponse<Event[] | undefined>) => {
      return firstPage?.data?.meta?.hasPreviousPage ? { page: firstPage?.data.meta.page - 1 } : null;
    },
  }),

  getEventParticipate: (query: GetEventQuery) => ({
    queryKey: queryKeys.getEvent(query),
    queryFn: () => eventService.getEvent(query),
  }),

  getEventStatus: (eventId?: number, userId?: number) => ({
    queryKey: queryKeys.getEventStatus(eventId, userId),
    queryFn: () => eventService.getEventStatus(eventId, userId),
  }),

  postEventApply: () => ({
    mutationKey: queryKeys.postEventApply(),
    mutationFn: (body: PostApplyEventRequset) => eventService.postApplyEvent(body),
  }),

  postEventDraw: () => ({
    mutationKey: queryKeys.postEventApply(),
    mutationFn: (body: PostApplyEventRequset) => eventService.postDrawEvent(body),
  }),

  deleteEvent: () => ({
    mutationFn: (body: DeleteEvnetRequest) => eventService.deleteEvenet(body),
  }),

  updateEvent: () => ({
    mutationFn: (body: UpdateEventRequest) => eventService.updateEvent(body),
  }),
};

export default queryOptions;
