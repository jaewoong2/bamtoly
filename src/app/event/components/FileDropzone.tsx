import Image from 'next/image';
import React, { useCallback } from 'react';
import { DropzoneInputProps, DropzoneRootProps, useDropzone } from 'react-dropzone';
import { UseFormReturn } from 'react-hook-form';

import { useUploadImageMutation } from '@/apis/services/image/useImageService';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FileDropzoneProps {
  form: UseFormReturn<any>; // Accept any form type
  label?: string;
  disabled?: boolean;
  error?: string;
}

const FileDropzone = ({ form, label, disabled, error }: FileDropzoneProps) => {
  // 'imageSrc' 필드의 존재 여부를 확인합니다.
  const formValues = form.getValues();

  const imageSrc = (form.watch('imageSrc') as string[]) ?? [];

  const { mutate } = useUploadImageMutation({
    onSuccess(data) {
      if (data.data?.url) {
        const currentImageSrc = (form.getValues('imageSrc') as string[]) ?? [];
        form.setValue('imageSrc', [...currentImageSrc, data.data?.url]);
      }
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      mutate({ file });
    },
    [mutate]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  if (!('imageSrc' in formValues)) {
    // 'imageSrc' 필드가 없으면 컴포넌트를 렌더링하지 않습니다.
    return null;
  }

  return (
    <div className='relative'>
      <div className='flex flex-col gap-2'>
        <Label className={error && 'w-full text-red-500'}>{label}</Label>
        {!disabled && (
          <Card
            {...getRootProps<DropzoneRootProps>()}
            className={cn(
              'flex h-28 items-center justify-center rounded-md border-2 border-dashed p-4 text-center text-gray-600 shadow-none',
              isDragActive ? 'border-blue-500' : 'border-gray-300'
            )}
          >
            <input {...getInputProps<DropzoneInputProps>()} className='hidden' disabled={disabled} />
            {isDragActive ? <p>이미지 드랍 하기</p> : <p>이미지를 드래그 & 드랍 해주세요</p>}
          </Card>
        )}
      </div>

      <div className='grid w-full grid-cols-3 items-center justify-center gap-2 p-2'>
        {imageSrc?.map((image) => (
          <div className='relative h-20 w-20 rounded-xl border' key={image}>
            <Image fill src={image} alt='Uploaded preview' className='h-full w-full object-cover' />
            <button
              onClick={() => {
                const currentImageSrc = (form.getValues('imageSrc') as string[]) || [];
                form.setValue(
                  'imageSrc',
                  currentImageSrc.filter((v) => v !== image)
                );
              }}
              className='absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full border bg-white p-2 dark:bg-gray-600'
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      {error && <p className='w-full text-xs text-red-500'>{error}</p>}
    </div>
  );
};

export default FileDropzone;
