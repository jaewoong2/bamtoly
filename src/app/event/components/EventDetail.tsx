'use client';

import { Calendar, Check, ChevronLeft, ChevronRight, Clock, Gift, Users, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getKoreanYYYYMMDD } from '@/lib/time';

interface Gifticon {
  id: number;
  imageUrl: string;
  name: string;
  category: string;
  description: string;
  isClaimed: boolean;
  claimedAt: string | null;
}

interface EventData {
  id: number;
  user: {
    id: number;
    avatar: string;
    email: string;
    userName: string;
  };
  eventName: string;
  eventDescription: string;
  eventStartDate: string;
  eventEndDate: string;
  maxParticipants: number;
  totalGifticons: number;
  gifticons: Gifticon[];
  participants: any[];
}

export default function CarouselEventDetailsPage() {
  const eventData: EventData = {
    id: 10,
    user: {
      id: 6,
      avatar: 'test2',
      email: 'test1@test.com',
      userName: 'test-user1',
    },
    eventName: '5',
    eventDescription: '설명입니다',
    eventStartDate: '2024-10-31T05:22:33.000Z',
    eventEndDate: '2024-10-31T05:22:33.000Z',
    maxParticipants: 10,
    totalGifticons: 14,
    gifticons: [
      {
        id: 8,
        imageUrl: '/placeholder.svg?height=200&width=200',
        name: '스타벅스 아메리카노',
        category: 'COFFEE',
        description: '깊고 풍부한 맛의 스타벅스 아메리카노',
        isClaimed: false,
        claimedAt: null,
      },
      {
        id: 11,
        imageUrl: '/placeholder.svg?height=200&width=200',
        name: 'CGV 영화 티켓',
        category: 'ENTERTAINMENT',
        description: 'CGV에서 사용 가능한 2D 영화 티켓',
        isClaimed: false,
        claimedAt: null,
      },
      {
        id: 12,
        imageUrl: '/placeholder.svg?height=200&width=200',
        name: '배스킨라빈스 파인트',
        category: 'FOOD',
        description: '배스킨라빈스 파인트 아이스크림',
        isClaimed: false,
        claimedAt: null,
      },
      {
        id: 9,
        imageUrl: '/placeholder.svg?height=200&width=200',
        name: '교보문고 5000원 상품권',
        category: 'SHOPPING',
        description: '교보문고에서 사용 가능한 5000원 상품권',
        isClaimed: true,
        claimedAt: '2024-10-29T02:30:11.027Z',
      },
    ],
    participants: [],
  };

  const [isParticipating, setIsParticipating] = useState(false);
  const [selectedGifticon, setSelectedGifticon] = useState<Gifticon | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: string) => {
    return getKoreanYYYYMMDD(date);
  };

  const participantsCount = eventData.participants.length;
  const participationProgress = (participantsCount / eventData.maxParticipants) * 100;

  const handleParticipate = () => {
    setIsParticipating(true);
    // Here you would typically make an API call to register the user's participation
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === eventData.gifticons.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? eventData.gifticons.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <div className='container mx-auto px-4 py-8'>
      <Card className='mb-8'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='mb-2 text-3xl font-bold'>{eventData.eventName}</CardTitle>
              <CardDescription>{eventData.eventDescription}</CardDescription>
            </div>
            <Avatar className='h-12 w-12'>
              <AvatarImage src={eventData.user.avatar} alt={eventData.user.userName} />
              <AvatarFallback>{eventData.user.userName[0]}</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent>
          <div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='flex items-center'>
              <Calendar className='mr-2 h-5 w-5 text-muted-foreground' />
              <span>시작: {formatDate(eventData.eventStartDate)}</span>
            </div>
            <div className='flex items-center'>
              <Clock className='mr-2 h-5 w-5 text-muted-foreground' />
              <span>종료: {formatDate(eventData.eventEndDate)}</span>
            </div>
            <div className='flex items-center'>
              <Users className='mr-2 h-5 w-5 text-muted-foreground' />
              <span>
                참가자: {participantsCount} / {eventData.maxParticipants}
              </span>
            </div>
            <div className='flex items-center'>
              <Gift className='mr-2 h-5 w-5 text-muted-foreground' />
              <span>총 기프티콘: {eventData.totalGifticons}개</span>
            </div>
          </div>
          <Progress value={participationProgress} className='w-full' />
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleParticipate}
            disabled={isParticipating || participantsCount >= eventData.maxParticipants}
            className='w-full'
          >
            {isParticipating ? '참여 완료' : '이벤트 참여하기'}
          </Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue='gifticons'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='gifticons'>기프티콘 목록</TabsTrigger>
          <TabsTrigger value='participants'>참가자 목록</TabsTrigger>
        </TabsList>
        <TabsContent value='gifticons'>
          <div className='relative overflow-hidden'>
            <div
              ref={carouselRef}
              className='flex transition-transform duration-300 ease-in-out'
              style={{ width: `${eventData.gifticons.length * 100}%` }}
            >
              {eventData.gifticons.map((gifticon) => (
                <div key={gifticon.id} className='w-full flex-shrink-0'>
                  <Card className='m-4'>
                    <img src={gifticon.imageUrl} alt={gifticon.name} className='h-64 w-full object-cover' />
                    <CardHeader>
                      <CardTitle>{gifticon.name}</CardTitle>
                      <CardDescription>{gifticon.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge
                        variant={
                          gifticon.category === 'COFFEE'
                            ? 'default'
                            : gifticon.category === 'ENTERTAINMENT'
                              ? 'secondary'
                              : gifticon.category === 'FOOD'
                                ? 'destructive'
                                : 'outline'
                        }
                      >
                        {gifticon.category}
                      </Badge>
                    </CardContent>
                    <CardFooter className='flex justify-between'>
                      <Badge variant={gifticon.isClaimed ? 'secondary' : 'default'}>
                        {gifticon.isClaimed ? '사용됨' : '미사용'}
                      </Badge>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant='outline' onClick={() => setSelectedGifticon(gifticon)}>
                            상세 정보
                          </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[425px]'>
                          <DialogHeader>
                            <DialogTitle>{selectedGifticon?.name}</DialogTitle>
                            <DialogDescription>{selectedGifticon?.description}</DialogDescription>
                          </DialogHeader>
                          <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                              <img
                                src={selectedGifticon?.imageUrl}
                                alt={selectedGifticon?.name}
                                className='col-span-4 h-48 w-full rounded-md object-cover'
                              />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                              <span className='col-span-2 text-right'>카테고리:</span>
                              <span className='col-span-2'>{selectedGifticon?.category}</span>
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                              <span className='col-span-2 text-right'>상태:</span>
                              <span className='col-span-2 flex items-center'>
                                {selectedGifticon?.isClaimed ? (
                                  <>
                                    <Check className='mr-2 h-4 w-4 text-green-500' />
                                    사용됨
                                  </>
                                ) : (
                                  <>
                                    <X className='mr-2 h-4 w-4 text-red-500' />
                                    미사용
                                  </>
                                )}
                              </span>
                            </div>
                            {selectedGifticon?.isClaimed && (
                              <div className='grid grid-cols-4 items-center gap-4'>
                                <span className='col-span-2 text-right'>사용 일시:</span>
                                <span className='col-span-2'>
                                  {selectedGifticon?.claimedAt ? formatDate(selectedGifticon.claimedAt) : '-'}
                                </span>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
            <Button
              variant='outline'
              size='icon'
              className='absolute left-2 top-1/2 -translate-y-1/2 transform'
              onClick={prevSlide}
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              className='absolute right-2 top-1/2 -translate-y-1/2 transform'
              onClick={nextSlide}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </TabsContent>
        <TabsContent value='participants'>
          {eventData.participants.length > 0 ? (
            <ul className='space-y-2'>
              {eventData.participants.map((participant, index) => (
                <li key={index} className='flex items-center space-x-2'>
                  <Avatar>
                    <AvatarFallback>{participant.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{participant.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-center text-muted-foreground'>아직 참가자가 없습니다.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
