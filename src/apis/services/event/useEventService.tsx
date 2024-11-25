import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

import Link from 'next/link';

import { Event } from '@/atoms/types';
import { useToast } from '@/hooks/use-toast';
import { customRevalidateTag } from '@/lib/serverActions';
import { DefaultResponse, FcFsError, UseInfiniteOptions } from '@/lib/type';

import queryOptions from './queries';
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

export function useGetEvent(
  query: GetEventQuery,
  options?: Omit<UseQueryOptions<DefaultResponse<Event | undefined>>, 'queryFn' | 'queryKey'>
) {
  return useQuery({
    ...queryOptions.getEvent(query),
    retry: 1,
    ...options,
  });
}

export function useGetEventParticipate(
  query: GetEventQuery,
  options?: Omit<UseQueryOptions<DefaultResponse<Event | undefined>>, 'queryFn' | 'queryKey'>
) {
  return useQuery({
    ...queryOptions.getEvent(query),
    retry: 1,
    ...options,
  });
}

export function useInfiniteGetAllEvents({ initialPageParam, params }: UseInfiniteOptions<Event[], GetAllEventsQuery>) {
  return useSuspenseInfiniteQuery({
    ...queryOptions.getAllEvents(params),
    initialPageParam: initialPageParam ?? { page: 1 },
  });
}

export function useGetEventStatus(
  { eventId, userId }: { eventId?: number; userId?: number },
  options?: Omit<UseQueryOptions<DefaultResponse<GetEventStatusResponse | null>>, 'queryFn' | 'queryKey'>
) {
  return useQuery({
    ...queryOptions.getEventStatus(eventId, userId),
    retry: 1,
    staleTime: 1000,
    enabled: eventId === undefined ? false : true,
    ...options,
  });
}

export function usePostEventApply(
  options?: Omit<
    UseMutationOptions<DefaultResponse<PostApplyEventResponse | null>, FcFsError, PostApplyEventRequset>,
    'mutationKey' | 'mutationFn'
  >
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    ...queryOptions.postEventApply(),
    ...options,
    onSuccess(data, vars, context) {
      if (options?.onSuccess) {
        options.onSuccess(data, vars, context);
      }
      if (!data.data.isAvailable) {
        toast({ title: data.data.message });
      }

      queryClient.invalidateQueries({ queryKey: queryOptions.getEventStatus(vars.eventId, vars.userId).queryKey });
    },
    onError(error, vars, context) {
      if (options?.onError) {
        options.onError(error, vars, context);
      }
      toast({ title: error.message, variant: 'destructive' });
      queryClient.invalidateQueries({ queryKey: queryOptions.getEventStatus(vars.eventId, vars.userId).queryKey });
    },
  });
}

export function usePostEventDraw(
  options?: Omit<
    UseMutationOptions<DefaultResponse<PostDarwEventResponse | null>, FcFsError, PostApplyEventRequset>,
    'mutationKey' | 'mutationFn'
  >
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    ...queryOptions.postEventDraw(),
    ...options,
    onSuccess(data, vars, context) {
      if (options?.onSuccess) {
        options.onSuccess(data, vars, context);
      }

      queryClient.invalidateQueries({ queryKey: queryOptions.getEventStatus(vars.eventId, vars.userId).queryKey });
    },
    onError(error, vars, context) {
      if (options?.onError) {
        options.onError(error, vars, context);
      }
      toast({ title: error.message, variant: 'destructive' });
      queryClient.invalidateQueries({ queryKey: queryOptions.getEventStatus(vars.eventId, vars.userId).queryKey });
    },
  });
}

export function useCreateEvent(
  options?: Omit<
    UseMutationOptions<DefaultResponse<CreateEventRespomse | null>, FcFsError, CreateEventParams>,
    'mutationKey' | 'mutationFn'
  >
) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    ...queryOptions.createEvent(),
    ...options,
    async onSuccess(data, vars, context) {
      await queryClient.invalidateQueries({ queryKey: ['getEvent', 'getAllEvents'] });
      await customRevalidateTag('event');

      if (options?.onSuccess) {
        options.onSuccess(data, vars, context);
      }

      toast({
        title: `이벤트가 생성 되었습니다 🎉`,
        description: <Link href={`user/events/${vars.eventName}`}>이벤트 설정 하러가기</Link>,
      });
    },
    onError(error, vars, context) {
      if (options?.onError) {
        options.onError(error, vars, context);
      }
      toast({ title: error.message, variant: 'destructive' });
    },
  });
}

export function useDeleteEvent(
  options?: Omit<
    UseMutationOptions<DefaultResponse<DeleteEvnetResponse | null>, FcFsError, DeleteEvnetRequest>,
    'mutationKey' | 'mutationFn'
  >
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    ...queryOptions.deleteEvent(),
    ...options,
    async onSuccess(data, vars, context) {
      await queryClient.invalidateQueries({ queryKey: ['getEvent', 'getAllEvents'] });
      await customRevalidateTag('event');

      if (options?.onSuccess) {
        options.onSuccess(data, vars, context);
      }

      toast({
        title: `이벤트가 삭제 되었습니다.`,
        description: <div>이벤트가 삭제 되었습니다.</div>,
      });
    },
    onError(error, vars, context) {
      if (options?.onError) {
        options.onError(error, vars, context);
      }
      toast({ title: error.message, variant: 'destructive' });
    },
  });
}

export function useUpdateEvent(
  options?: Omit<
    UseMutationOptions<DefaultResponse<UpdateEventResponse | null>, FcFsError, UpdateEventRequest>,
    'mutationKey' | 'mutationFn'
  >
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    ...queryOptions.updateEvent(),
    ...options,
    async onSuccess(data, vars, context) {
      await queryClient.invalidateQueries({ queryKey: ['getEvent', 'getAllEvents'] });
      await customRevalidateTag('event');

      if (options?.onSuccess) {
        options.onSuccess(data, vars, context);
      }

      toast({
        title: `이벤트가 수정 되었습니다.`,
        description: <div>이벤트가 수정 되었습니다.</div>,
      });
    },
    onError(error, vars, context) {
      if (options?.onError) {
        options.onError(error, vars, context);
      }
      toast({ title: error.message, variant: 'destructive' });
    },
  });
}
