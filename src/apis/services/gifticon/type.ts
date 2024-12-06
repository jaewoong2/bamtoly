import { Event, Gifticon, User } from '@/atoms/types';

export type GetAllEventsQuery = {
  readonly startDate?: Event['eventStartDate'];
  readonly endDate?: Event['eventEndDate'];
  readonly name?: Event['eventName'];
  readonly description?: Event['eventDescription'];
};

export type GetEventStatusResponse = {
  isAvailable: boolean;
  message: string;
};

export type DeleteGifticonResponse = {
  eventId: Event['id'];
  gifticonId: Gifticon['id'];
  message: string;
};

export type DeleteGifticonRequest = {
  eventId: Event['id'];
  gifticonId: Gifticon['id'];
  name?: Gifticon['name'];
};

export type UpdateGifticonResponse = {
  eventId: Event['id'];
  gifticonId: Gifticon['id'];
  message: string;
};

export type GetGifticonResponse = Gifticon;

export type GetGifticonRequest = {
  gifticonId: Gifticon['id'];
  name?: Gifticon['name'];
};

export type GetGifticonAllRequest = {
  page?: number;
  take?: number;
  name?: Gifticon['name'];
  gifticonId?: Gifticon['id'];
  eventId?: number;
  userId?: User['id'];
  claimedBy?: User['id'];
};

export type UpdateGifticonRequest = Partial<CreateGifticonParmas> & {
  gifticonId: Gifticon['id'];
  eventId: Event['id'];
};

export type CreateGifticonParmas = {
  eventId: Event['id'];
  name: string;
  category: 'FOOD' | 'OTHER' | 'LOSE';
  description?: string;
  message?: string | null;
  imageUrl: string;
};

export type CreateGifticonResponse = {
  eventId: Event['id'];
  gifticonId: Gifticon['id'];
  message: string;
};

export type PostClaimGifticonRequset = {
  eventId: Event['id'];
  userId: User['id'];
};

export type PostApplyEventResponse = {
  drawable: boolean;
  message: string;
  userId: User['id'];
};

export type PostClaimGifticonResponse = Gifticon;
