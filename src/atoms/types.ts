export interface User {
  id: number;
  avatar: string;
  email: string;
  userName: string;
  events?: Event[];
  gifticons?: Gifticon[];
  provider?: 'email' | 'google';
}

export interface Image {
  id: number;
  imageUrl: string;
  name: string;
  eventId?: Event['id'] | null;
  gifticonId?: Gifticon['id'] | null;
}

export interface Event {
  id: number;
  user?: User | null;
  eventName: string;
  eventDescription: string;
  eventStartDate: string;
  eventEndDate: string;
  maxParticipants: number;
  totalGifticons: number;
  participants?: (Participant | undefined)[];
  gifticons?: (Gifticon | undefined)[];
  thumbnails?: (Image | undefined)[];
  repetition: number;
}

export enum GifticonCategory {
  FOOD = 'FOOD',
  OTHER = 'OTHER',
  LOSE = 'LOSE',
}

export interface Gifticon {
  id: number;
  name: string;
  category: 'FOOD' | 'OTHER' | 'LOSE';
  description?: string;
  isClaimed: boolean;
  event?: Event | null;
  user?: User | null;
  claimedBy?: User | null;
  claimedAt?: string | null;
  message?: string | null;
  image?: Image | null;
}

export type Participant = {
  id: number;
  event?: Event;
  user?: User;
  participatedAt: string;
  isApply: boolean;
};
