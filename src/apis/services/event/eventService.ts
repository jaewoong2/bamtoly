import { z } from 'zod';

import { EventSchema } from '@/atoms/schemas';
import { Event } from '@/atoms/types';
import { DefaultResponse, GetInfinityResponse } from '@/lib/type';
import { buildQueryParams } from '@/lib/utils';

import BaseService from '../baseService';
import {
  CreateEventResponseSchema,
  GetEventStatusResponseSchema,
  PostApplyEventResponseSchema,
  PostDarwEventResponseSchema,
} from './schemas';
import {
  CreateEventParams,
  CreateEventRespomse,
  DeleteEvnetRequest,
  DeleteEvnetResponse,
  GetAllEventsQuery,
  GetEventQuery,
  GetEventStatusResponse,
  PostApplyEventRequset,
  PostApplyEventResponse,
  PostDarwEventResponse,
  UpdateEventRequest,
  UpdateEventResponse,
} from './type';

class EventService extends BaseService {
  async createEvent(body: CreateEventParams) {
    const result = await this.http<DefaultResponse<CreateEventRespomse | null>>(`/api/event`, {
      method: 'POST',
      body: body,
    });

    const data = CreateEventResponseSchema.parse(result.data);

    return { ...result, data: data };
  }

  async getEventParticipate(query: GetEventQuery) {
    const result = await this.http<DefaultResponse<Event>>(`/api/event/participate?${buildQueryParams(query)}`, {
      next: { tags: ['event', buildQueryParams(query)] },
    });

    const parsedData = EventSchema.optional().parse(result.data);

    return { ...result, data: parsedData };
  }

  async getEvent(query: GetEventQuery) {
    const result = await this.http<DefaultResponse<Event>>(`/api/event?${buildQueryParams(query)}`, {
      next: { tags: ['event'] },
    });

    return { ...result };
  }

  async getAllEvents(page: number, options?: RequestInit, params?: GetAllEventsQuery) {
    const result = await this.http<GetInfinityResponse<Event[]>>(
      `/api/event/all?${buildQueryParams({ page, take: 5, ...params })}`,
      {
        next: { tags: ['event'] },
        ...options,
      }
    );
    try {
      const parsedData = z.array(EventSchema).optional().parse(result?.data?.data);

      return { ...result, data: { ...result.data, data: parsedData } };
    } catch (err) {
      return result;
    }
  }

  async getEventStatus(eventId?: number, userId?: number) {
    try {
      const result = await this.http<DefaultResponse<GetEventStatusResponse | null>>(
        `/api/event/status?eventId=${eventId}&userId=${userId}`,
        {}
      );

      const data = GetEventStatusResponseSchema.parse(result.data);

      return { ...result, data: data };
    } catch (err) {
      console.log(err);
      return { data: null, error: '', message: '', status: 200, success: true };
    }
  }

  async postApplyEvent({ eventId, userId }: PostApplyEventRequset) {
    const result = await this.http<DefaultResponse<PostApplyEventResponse | null>>(`/api/event/apply`, {
      method: 'POST',
      body: { eventId, userId },
    });
    const data = PostApplyEventResponseSchema.parse(result.data);

    return { ...result, data: data };
  }

  async postDrawEvent({ eventId, userId }: PostApplyEventRequset) {
    const result = await this.http<DefaultResponse<PostDarwEventResponse | null>>(`/api/event/draw`, {
      method: 'POST',
      body: { eventId, userId },
    });

    const data = PostDarwEventResponseSchema.parse(result.data);
    return { ...result, data: data };
  }

  async deleteEvenet({ eventId }: DeleteEvnetRequest) {
    const result = await this.http<DefaultResponse<DeleteEvnetResponse | null>>(`/api/event/${eventId}`, {
      method: 'DELETE',
    });

    return { ...result };
  }

  async updateEvent(body: UpdateEventRequest) {
    const result = await this.http<DefaultResponse<UpdateEventResponse | null>>(`/api/event/${body.eventId}`, {
      method: 'PATCH',
      body: body,
    });

    return { ...result };
  }
}

const eventService = new EventService();

export default eventService;
