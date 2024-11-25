'use client';

import gifticonService from './gifticonService';
import { CreateGifticonParmas, GetGifticonRequest, PostClaimGifticonRequset, UpdateGifticonRequest } from './type';

const queryKeys = {
  find: (query: GetGifticonRequest) => ['gifticon', query.gifticonId, query.name],
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

  delete: () => ({
    mutationFn: (body: UpdateGifticonRequest) => gifticonService.delete(body),
  }),
};

export default queryOptions;
