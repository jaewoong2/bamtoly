'use client';

import { atom } from 'jotai';

import { Gifticon } from './types';

export const gifticonAtom = atom<Gifticon | null>(null);
