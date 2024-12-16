import { Gift } from 'lucide-react';
import React from 'react';

import { Event } from '@/atoms/types';
import { getKoreanYYYYMMDD } from '@/lib/time';
import { cn } from '@/lib/utils';

import ImageCarousel from '../blocks/ImageCarousel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import ImageWithBackground from '../ui/image-bg';
import EventBadge from './EventBadge';

type Props = {
  onClickItem: React.MouseEventHandler<HTMLDivElement>;
  thumbnails?: Event['thumbnails'];
  startDate?: string;
  endDate?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;

  gifticonsLength?: number;
  totalGifticons?: number;
};

const EventItem = ({
  onClickItem,
  title,
  thumbnails,
  startDate,
  endDate,
  totalGifticons,
  description,
  gifticonsLength,
  footer,
}: Props) => {
  return (
    <Card className={`cursor-pointer shadow-none transition-all hover:shadow-lg`} onClick={onClickItem}>
      <div className='grid grid-cols-12 items-start'>
        <div className='col-span-1 mx-2 flex h-full w-full items-center justify-center'>
          <ImageCarousel images={thumbnails} autoplayInterval={5000} pauseOnHover>
            {(image) => (
              <ImageWithBackground
                title={`이벤트 [${title}] 이미지 입니다.`}
                fill
                src={image?.imageUrl ?? `${process.env.NEXT_PUBLIC_DEFAULT_IMAGE}`}
                alt={title?.toString() ?? 'event thumbnail'}
                containerClassName={cn(
                  'w-full h-auto relative aspect-square',
                  'p-0 rounded-md items-center justify-center flex aspect-square'
                )}
                className='aspect-square p-1 will-change-auto'
              />
            )}
          </ImageCarousel>
        </div>

        <div className='col-span-11 flex h-full w-full flex-col max-md:col-span-10'>
          <CardHeader className='pb-0'>
            <div className='relative flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <CardTitle className='text-lg'>{title}</CardTitle>
              </div>
              <EventBadge event={{ eventStartDate: startDate ?? '', eventEndDate: endDate ?? '' }} />
            </div>
          </CardHeader>
          <CardContent className='pb-2'>
            {description}
            <div className='mb-2 flex items-center justify-between'>
              <div className='flex items-center gap-1 space-x-0'>
                <Gift className='h-4 w-4' />
                {gifticonsLength && totalGifticons ? (
                  <span className='text-sm'>당첨 확률: {Math.round((gifticonsLength / totalGifticons) * 100)}%</span>
                ) : (
                  <span className='text-sm'>기프티콘이 등록 되지 않았습니다.</span>
                )}
              </div>
              <div>
                {endDate && (
                  <span className='text-xs font-semibold text-primary'>{getKoreanYYYYMMDD(endDate)} 까지</span>
                )}
              </div>
            </div>
          </CardContent>
          <div className='flex w-full justify-end p-4'>{footer}</div>
        </div>
      </div>
    </Card>
  );
};

export default EventItem;
