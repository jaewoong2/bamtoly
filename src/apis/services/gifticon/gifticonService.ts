import { revalidateTag } from 'next/cache';

import { DefaultResponse } from '@/lib/type';

import BaseService from '../baseService';
import { CreateEventResponseSchema, PostClaimGifticonResponseSchema } from './schemas';
import {
  CreateGifticonParmas,
  CreateGifticonResponse,
  DeleteGifticonRequest,
  DeleteGifticonResponse,
  GetGifticonRequest,
  GetGifticonResponse,
  PostClaimGifticonRequset,
  PostClaimGifticonResponse,
  UpdateGifticonRequest,
  UpdateGifticonResponse,
} from './type';

class GifticonService extends BaseService {
  async postClaimGifticon({ eventId, userId }: PostClaimGifticonRequset) {
    const result = await this.http<DefaultResponse<PostClaimGifticonResponse | null>>(`/api/gifticon/claim`, {
      method: 'POST',
      body: { eventId, userId },
    });

    const data = PostClaimGifticonResponseSchema.parse(result.data);

    return { ...result, data: data };
  }

  async create({ eventId, ...params }: CreateGifticonParmas) {
    const result = await this.http<DefaultResponse<CreateGifticonResponse | null>>(`/api/gifticon`, {
      method: 'POST',
      body: { eventId, ...params },
    });

    const data = CreateEventResponseSchema.parse(result.data);

    return { ...result, data: data };
  }

  async update({ eventId, gifticonId, ...params }: UpdateGifticonRequest) {
    const result = await this.http<DefaultResponse<UpdateGifticonResponse | null>>(`/api/gifticon/${gifticonId}`, {
      method: 'PATCH',
      body: { eventId, ...params },
    });

    return { ...result };
  }

  async find({ gifticonId, name }: GetGifticonRequest) {
    const result = await this.http<DefaultResponse<GetGifticonResponse | null>>(
      `/api/gifticon/find?id=${gifticonId}&name=${name}`,
      {}
    );

    return { ...result };
  }

  async delete({ eventId, gifticonId, ...params }: DeleteGifticonRequest) {
    const result = await this.http<DefaultResponse<DeleteGifticonResponse | null>>(`/api/gifticon/${gifticonId}`, {
      method: 'DELETE',
      body: { eventId, ...params },
    });

    return { ...result };
  }
}

const gifticonService = new GifticonService();

export default gifticonService;
