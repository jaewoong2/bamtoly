'use client';

import { atom } from 'jotai';

import { Participant } from './types';

export const participantsAtom = atom<Participant[]>([]);
