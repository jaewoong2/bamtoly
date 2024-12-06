'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateGifticon, useGetGifticon, useUpdateGifticon } from '@/apis/services/gifticon/useGifticonService';
import EventInput from '@/app/event/components/EventInput';
import FileDropzone from '@/app/event/components/FileDropzone';
import { GifticonCategorySchema } from '@/atoms/schemas';
import DeleteDialogButton from '@/components/blocks/DeleteButton';
import SelectInput from '@/components/blocks/SelectInput';
import { Button } from '@/components/ui/button';
import { Form, FormMessage } from '@/components/ui/form';
import { customRevalidateTag } from '@/lib/serverActions';

export const CreateGifticonSchema = z.object({
  title: z.string().min(1, '기프티콘 이름을 작성 해주세요'),
  message: z.string().min(1, '당첨시 보여줄 메시지를 작성 해주세요'),
  description: z.string().min(1, '기프티콘 설명을 작성 해주세요'),
  imageSrc: z.array(z.string()).min(1, '이미지를 추가 해주세요'),
  category: GifticonCategorySchema,
});

const getSearchParams = (search: ReadonlyURLSearchParams, names: string[]) => {
  let result: { [key: string]: string } = {};

  for (let name of names) {
    result[name] = search.get(name) ?? '';
  }

  return result;
};

const GifticonCreate = () => {
  const search = useSearchParams();
  const { eventId, gifticonId } = getSearchParams(search, ['eventId', 'category', 'gifticonId']);
  const { back } = useRouter();

  const form = useForm<z.infer<typeof CreateGifticonSchema>>({
    resolver: zodResolver(CreateGifticonSchema),
    defaultValues: {
      description: '',
      message: '',
      title: '',
      imageSrc: [],
      category: 'OTHER',
    },
  });

  const handleSuccess = useCallback(async () => {
    form.reset();
    back();
  }, [form, back]);

  const { data: gifticon } = useGetGifticon({ gifticonId: Number(gifticonId) }, { enabled: !!gifticonId });

  const { mutate: create, isPending: createPending } = useCreateGifticon({
    onSuccess: handleSuccess,
  });

  const { mutate: update, isPending: updatePending } = useUpdateGifticon({
    onSuccess: handleSuccess,
  });

  const handleSubmit = () => {
    const { imageSrc, message, category, title, description } = form.getValues();

    if (Number(gifticonId) > 0 && Number(eventId) > 0) {
      if (updatePending) return;
      update(
        {
          gifticonId: Number(gifticonId),
          eventId: Number(eventId),
          imageUrl: imageSrc[0],
          message,
          category,
          name: title,
          description,
        },
        {
          async onSettled() {
            await customRevalidateTag('event');
            handleSuccess();
          },
        }
      );
    } else {
      if (createPending) return;
      create({
        eventId: Number(eventId),
        imageUrl: imageSrc[0],
        message,
        category,
        name: title,
        description,
      });
    }
  };

  useEffect(() => {
    if (gifticon) {
      form.reset({
        category: gifticon.data?.category,
        description: gifticon.data?.category,
        imageSrc: [gifticon.data?.image?.imageUrl ?? '/ramram.png'],
        message: `${gifticon.data?.message}`,
        title: gifticon.data?.name,
      });
    }
  }, [gifticon, form]);

  return (
    <div className='container mx-auto flex h-full min-h-[calc(100vh-64px)] w-full flex-col justify-between max-md:px-6'>
      <Form {...form}>
        <form
          className='flex flex-col gap-4'
          onSubmit={form.handleSubmit(handleSubmit, (errors) => {
            console.log(errors); // 디버깅용
          })}
        >
          <SelectInput
            label='기프티콘 종류'
            form={form}
            formKey='category'
            options={[
              { label: '상품권', value: 'OTHER' },
              { label: '꽝', value: 'LOSE' },
            ]}
          />
          <FileDropzone
            error={form.formState.errors.imageSrc?.message}
            form={form}
            label='기프티콘 이미지'
            disabled={form.watch('imageSrc').length > 0}
          />
          <EventInput label='기프티콘' form={form} formKey='title' className='py-4 shadow-none' />
          <EventInput
            label='기프티콘 설명'
            form={form}
            formKey='description'
            as='textarea'
            className='h-24 resize-none shadow-none'
          />
          <EventInput
            label='당첨시 보여질 메시지 '
            form={form}
            formKey='message'
            as='textarea'
            className='h-24 resize-none shadow-none'
          />
          <div className='flex w-full justify-end gap-2'>
            {gifticonId && (
              <DeleteDialogButton
                onSuccess={handleSuccess}
                type='button'
                category={{
                  type: 'gifticon',
                  id: {
                    gifticonId: Number(gifticonId),
                    eventId: Number(eventId),
                  },
                }}
              >
                삭제하기
              </DeleteDialogButton>
            )}
            <Button
              disabled={gifticonId ? updatePending : createPending}
              onClick={() => customRevalidateTag('event')}
              className='mb-6 w-full'
            >
              {gifticonId ? '수정하기' : '추가하기'}
            </Button>
          </div>

          <FormMessage />
        </form>
      </Form>
    </div>
  );
};

export default GifticonCreate;
