import React, { useEffect } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';

type Props = {};

const GiftionCarousel = (props: Props) => {
  const [api, setApi] = React.useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [api]);

  return (
    <div className='flex w-full items-center justify-center'>
      <Carousel setApi={setApi} className='w-[60%] max-w-[300px]' opts={{ loop: true }}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className='p-1'>
                <Card className='border-none bg-red-200 shadow-none'>
                  <CardContent className='flex aspect-square items-center justify-center p-4'>
                    <span className='text-4xl font-semibold'>{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default GiftionCarousel;
