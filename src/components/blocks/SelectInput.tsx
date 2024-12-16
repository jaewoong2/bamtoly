import React from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type SelectInputProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  formKey: Path<TFieldValues>;
  label?: string;
  description?: React.ReactNode;
  options: { value: string; label: string }[];
  placeholder?: string;
};

const SelectInput = <TFieldValues extends FieldValues>({
  form,
  formKey,
  label,
  description,
  options,
  placeholder,
}: SelectInputProps<TFieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={formKey}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder || 'Select an option'} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectInput;
