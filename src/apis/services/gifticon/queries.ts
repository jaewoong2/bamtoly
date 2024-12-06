'use client';

import { Gifticon } from '@/atoms/types';
import { GetInfinityResponse } from '@/lib/type';

import gifticonService from './gifticonService';
import {
  CreateGifticonParmas,
  GetGifticonAllRequest,
  GetGifticonRequest,
  PostClaimGifticonRequset,
  UpdateGifticonRequest,
} from './type';

const queryKeys = {
  find: (query: GetGifticonRequest) => ['gifticon', query.gifticonId, query.name],
  findAll: (query: GetGifticonAllRequest) => ['gifticon', query.gifticonId, query.name],
  postClaimGifticon: ({ userId, eventId }: PostClaimGifticonRequset) => ['claim', userId, eventId],
};

const queryOptions = {
  postClaimGifticon: (params: PostClaimGifticonRequset) => ({
    mutationKey: queryKeys.postClaimGifticon(params),
    mutationFn: (body: PostClaimGifticonRequset) => gifticonService.postClaimGifticon(body),
  }),

  create: () => ({
    mutationFn: (body: CreateGifticonParmas) => gifticonService.create(body),
  }),

  update: () => ({
    mutationFn: (body: UpdateGifticonRequest) => gifticonService.update(body),
  }),

  find: (query: GetGifticonRequest) => ({
    queryKey: queryKeys.find(query),
    queryFn: () => gifticonService.find(query),
  }),

  findAll: (query: GetGifticonAllRequest) => ({
    queryKey: queryKeys.findAll(query),
    queryFn: ({ pageParam }: { pageParam: { page: number } }) =>
      gifticonService.findAll({ page: pageParam.page, ...query }),
    getNextPageParam: (lastPage: GetInfinityResponse<Gifticon[] | undefined>) => {
      return lastPage?.data?.meta?.hasNextPage ? { page: lastPage?.data.meta.page + 1 } : null;
    },
    getPreviousPageParam: (firstPage: GetInfinityResponse<Gifticon[] | undefined>) => {
      return firstPage?.data?.meta?.hasPreviousPage ? { page: firstPage?.data.meta.page - 1 } : null;
    },
  }),

  delete: () => ({
    mutationFn: (body: UpdateGifticonRequest) => gifticonService.delete(body),
  }),
};

export default queryOptions;
