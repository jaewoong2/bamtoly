import React, { useEffect } from 'react';
import { Field, FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'form'>;

type Props<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  formKey: Path<TFieldValues>;
  label?: string;
  description?: string;

  onChange: (quantity: number) => void;

  min?: number;
  max?: number;
} & InputProps;

const EventQuantityInput = <TFieldValues extends FieldValues>({
  form,
  formKey,
  description,
  label,
  onChange,
  min = 0,
  max = 100,
  ...props
}: Props<TFieldValues>) => {
  const quantity = form.watch(formKey);

  const handleIncrement = () => {
    const newQuantity = Math.min(max, quantity + 1);
    onChange?.(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(min, quantity - 1);
    onChange?.(newQuantity);
  };

  useEffect(() => {
    if (quantity >= max) {
      onChange?.(max);
    }
  }, [quantity, max, onChange]);

  return (
    <FormField
      control={form.control}
      name={formKey}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          {label && <FormLabel>{label}</FormLabel>}
          <div className='flex w-fit items-center justify-center gap-4 border'>
            <Button
              variant={'ghost'}
              type='button'
              className='w-[40px] rounded-md px-3 py-1 focus:outline-none'
              onClick={handleDecrement}
              disabled={quantity <= min}
            >
              -
            </Button>
            <Input {...field} {...(props as InputProps)} type='number' className={cn('w-full', props.className)} />
            <Button
              variant={'ghost'}
              type='button'
              className='w-[40px] rounded-md px-3 py-1 focus:outline-none'
              onClick={handleIncrement}
              disabled={quantity >= max}
            >
              +
            </Button>
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EventQuantityInput;
