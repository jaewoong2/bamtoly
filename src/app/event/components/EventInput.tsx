import React from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'form'>;
type TextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'form'>;

type Props<TFieldValues extends FieldValues, T extends 'input' | 'textarea'> = {
  form: UseFormReturn<TFieldValues>;
  formKey: Path<TFieldValues>;
  label?: string;
  description?: string;
  as?: T;
  required?: boolean;
  container?: {
    className?: string;
  };
} & (T extends 'input' ? InputProps : TextareaProps);

const EventInput = <TFieldValues extends FieldValues, T extends 'input' | 'textarea'>({
  form,
  formKey,
  label,
  description,
  as,
  required,
  container,
  ...props
}: Props<TFieldValues, T>) => {
  return (
    <FormField
      control={form.control}
      name={formKey}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', container?.className)}>
          {label && (
            <FormLabel>
              {label} <span className='text-red-600'>{required ?? '*'}</span>
            </FormLabel>
          )}
          {as === 'textarea' ? (
            <Textarea {...field} {...(props as TextareaProps)} />
          ) : (
            <Input {...field} {...(props as InputProps)} />
          )}
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EventInput;
