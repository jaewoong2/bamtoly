'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { addDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateEvent, useGetEvent, useUpdateEvent } from '@/apis/services/event/useEventService';
import DeleteDialogButton from '@/components/blocks/DeleteButton';
import withAuth from '@/components/hoc/withAuth';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { customRevalidateTag } from '@/lib/serverActions';
import { getYYYYMMDD } from '@/lib/time';
import { cn } from '@/lib/utils';

import EventDatePicker from '../components/EventDatePicker';
import EventInput from '../components/EventInput';
import EventQuantityInput from '../components/EventQuantityInput';
import FileDropzone from '../components/FileDropzone';

export const FormSchema = z.object({
  date: z.object({
    from: z.date({
      required_error: '시작날짜를 선택 해주세요',
    }),
    to: z.date({
      required_error: '종료날짜를 선택 해주세요',
    }),
  }),
  title: z.string(),
  description: z.string(),
  imageSrc: z.array(z.string()),
  repetition: z.number(),
});

type Props = {
  eventId?: number;
};

const EventCreatePage = ({ eventId }: Props) => {
  const { back } = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: {
        from: new Date(getYYYYMMDD(new Date())),
        to: addDays(new Date(getYYYYMMDD(new Date())), 20),
      },
      description: '',
      title: '',
      imageSrc: [],
      repetition: 1,
    },
  });

  const handleSuccess = () => {
    form.reset();
    back();
  };

  const { data: event } = useGetEvent({ eventId }, { enabled: !!eventId });

  const { mutate: create } = useCreateEvent({
    onSuccess: handleSuccess,
  });

  const { mutate: update } = useUpdateEvent({
    onSuccess: handleSuccess,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { date, description, imageSrc, title, repetition } = form.getValues();

    if (eventId) {
      update({
        eventId,
        eventEndDate: date.to,
        eventStartDate: date.from,
        eventName: title,
        eventDescription: description,
        images: imageSrc,
        repetition: repetition,
        maxParticipants: 100,
        totalGifticons: 0,
      });
    } else {
      create({
        eventEndDate: date.to,
        eventStartDate: date.from,
        eventName: title,
        eventDescription: description,
        images: imageSrc,
        repetition: repetition,
        maxParticipants: 100,
        totalGifticons: 0,
      });
    }
  };

  useEffect(() => {
    if (event) {
      form.reset({
        date: {
          from: new Date(getYYYYMMDD(event.data?.eventStartDate)),
          to: new Date(getYYYYMMDD(event.data?.eventEndDate)),
        },
        title: event.data?.eventName,
        description: event.data?.eventDescription,
        imageSrc: event.data?.thumbnails?.map((v) => v?.imageUrl),
        repetition: event.data?.repetition,
      });
    }
  }, [event, form]);

  return (
    <div className='container mx-auto flex h-full min-h-[calc(100vh-64px)] w-full flex-col justify-between max-md:px-6'>
      <Form {...form}>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <EventDatePicker form={form} className='w-full shadow-none' />
          <EventInput label='이벤트 제목' form={form} formKey='title' className='py-4 shadow-none' />
          <EventInput
            label='이벤트 내용'
            form={form}
            formKey='description'
            as='textarea'
            className='h-36 resize-none shadow-none'
          />
          <Controller
            name='repetition'
            control={form.control}
            rules={{ min: 1, max: 100 }}
            render={({ field }) => (
              <EventQuantityInput
                form={form}
                label='반복 당첨 가능 횟수'
                description='한명 당 반복 당첨 가능 한 횟수에요'
                className='no-spinner w-[60px] border-none text-center shadow-none'
                formKey='repetition'
                value={field.value}
                onChange={field.onChange}
                min={1}
                max={100}
              />
            )}
          />
          <FileDropzone form={form} label='이벤트 썸네일' />
          <div className={cn(eventId && 'grid grid-cols-6 gap-4')}>
            {eventId ? (
              <DeleteDialogButton
                category={{
                  id: eventId,
                  type: 'event',
                }}
                className='col-span-2 mb-6 w-full'
                variant={'destructive'}
                onSuccess={() => handleSuccess()}
              >
                삭제하기
              </DeleteDialogButton>
            ) : null}
            <Button className='col-span-4 mb-6 w-full'>저장하기</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default withAuth(EventCreatePage, { isCreator: true });
