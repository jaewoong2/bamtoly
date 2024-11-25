'use client';

import { atom } from 'jotai';

import { Event } from './types';

export const selectedEventAtom = atom<Event | null>(null);
