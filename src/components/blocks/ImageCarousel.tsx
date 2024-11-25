import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback, useEffect, useState } from 'react';

import { Event, Image } from '@/atoms/types';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

type Props = {
  images?: Event['thumbnails'];
  className?: string;
  children: (image?: Image) => React.ReactNode;
  autoplayInterval?: number;
  pauseOnHover?: boolean;
};

const ImageCarousel = ({ images, className, children, autoplayInterval, pauseOnHover }: Props) => {
  const item = images && images?.length > 0 ? images : [undefined];
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!api) {
        return;
      }
      api.scrollNext();
    }, autoplayInterval);
    return () => {
      clearInterval(interval);
    };
  }, [api, autoplayInterval]);

  return (
    <Carousel
      className={cn('w-full', className)}
      setApi={setApi}
      opts={{
        loop: true,
        watchDrag: false,
      }}
    >
      <CarouselContent>
        {item?.map((image, index) => <CarouselItem key={`${index}`}>{children(image)}</CarouselItem>)}
      </CarouselContent>
    </Carousel>
  );
};

export default ImageCarousel;
