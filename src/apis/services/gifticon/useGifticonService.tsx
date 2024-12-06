import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

import Link from 'next/link';

import { Gifticon } from '@/atoms/types';
import { useToast } from '@/hooks/use-toast';
import { customRevalidateTag } from '@/lib/serverActions';
import { DefaultResponse, FcFsError, UseInfiniteOptions } from '@/lib/type';

import { DeleteEvnetRequest, DeleteEvnetResponse } from '../event/type';
import queryOptions from './queries';
import {
  CreateGifticonParmas,
  CreateGifticonResponse,
  GetGifticonAllRequest,
  GetGifticonRequest,
  GetGifticonResponse,
  PostClaimGifticonRequset,
  PostClaimGifticonResponse,
  UpdateGifticonRequest,
  UpdateGifticonResponse,
} from './type';

export function usePostGifticonClaim(
  params: PostClaimGifticonRequset,
  options?: Omit<
    UseMutationOptions<DefaultResponse<PostClaimGifticonResponse | null>, FcFsError, PostClaimGifticonRequset>,
    'mutationKey' | 'mutationFn'
  >
) {
  // const queryClient = useQueryClient();

  return useMutation({
    ...queryOptions.postClaimGifticon(params),
    ...options,
    onSuccess(data, vars, context) {
      if (options?.onSuccess) {
        options.onSuccess(data, vars, context);
      }
    },
  });
}

export function useCreateGifticon(
  options?: Omit<
    UseMutationOptions<DefaultResponse<CreateGifticonResponse | null>, FcFsError, CreateGifticonParmas>,
    'mutationKey' | 'mutationFn'
  >
) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    ...queryOptions.create(),
    ...options,
    async onSuccess(data, vars, context) {
      await queryClient.invalidateQueries({ queryKey: ['getEvent'] });
      await customRevalidateTag('event');

      if (options?.onSuccess) {
        options.onSuccess(data, vars, context);
      }

      toast({
        title: `기프티콘이 생성 되었습니다 🎉`,
      });
    },
  });
}

export function useUpdateGifticon(
  options?: Omit<
    UseMutationOptions<DefaultResponse<UpdateGifticonResponse | null>, FcFsError, UpdateGifticonRequest>,
    'mutationKey' | 'mutationFn'
  >
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    ...queryOptions.update(),
    ...options,
    onSuccess: async (data, vars, context) => {
      await queryClient.invalidateQueries({ queryKey: ['getEvent'] });
      await customRevalidateTag('event');
      if (typeof options?.onSuccess === 'function') {
        options.onSuccess(data, vars, context);
      }

      if (options?.onSuccess) {
        options.onSuccess(data, vars, context);
      }

      toast({
        title: `기프티콘을 수정 하였습니다 🎉`,
      });
    },
  });
}

export function useGetGifticon(
  query: GetGifticonRequest,
  options?: Omit<UseQueryOptions<DefaultResponse<GetGifticonResponse | null>>, 'queryFn' | 'queryKey'>
) {
  return useQuery({
    ...queryOptions.find(query),
    ...options,
  });
}

export function useDeleteGifticon(
  options?: Omit<
    UseMutationOptions<DefaultResponse<DeleteEvnetResponse | null>, FcFsError, DeleteEvnetRequest>,
    'mutationKey' | 'mutationFn'
  >
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    ...queryOptions.delete(),
    ...options,
    onSuccess: async (data, vars, context) => {
      await queryClient.invalidateQueries({ queryKey: ['getEvent'] });
      await customRevalidateTag('event');
      if (typeof options?.onSuccess === 'function') {
        options.onSuccess(data, vars, context);
      }

      if (options?.onSuccess) {
        options.onSuccess(data, vars, context);
      }

      toast({
        title: `기프티콘을 삭제 하였습니다`,
      });
    },
  });
}

export function useInfiniteGetAllGifticons({
  initialPageParam,
  params,
}: UseInfiniteOptions<GetGifticonResponse[], GetGifticonAllRequest>) {
  return useSuspenseInfiniteQuery({
    ...queryOptions.findAll(params),
    initialPageParam: initialPageParam ?? { page: 1 },
  });
}
