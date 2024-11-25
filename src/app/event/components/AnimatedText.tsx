import React, { PropsWithChildren } from 'react';

import Checkbox from '@/components/ui/checkbox2';
import { cn } from '@/lib/utils';

type Props = {
  label?: React.ReactNode;
  onChecked?: (checked: boolean) => any;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const AnimatedText = ({ children, label, onChecked, className, ...props }: PropsWithChildren<Props>) => {
  return (
    <div className={cn('animate-fade-right', className)} {...props}>
      <Checkbox
        autoCheck
        prevent
        id='c-1'
        className='select-none gap-3'
        onChecked={onChecked}
        onClick={(e) => e.preventDefault()}
      >
        <Checkbox.Label className='text-gray-800 no-underline aria-checked:text-[#a1a1aa]'>{label}</Checkbox.Label>
        <Checkbox.Indicator className='rounded-full border-[1px] checked:border-amber-800 checked:bg-amber-800' />
      </Checkbox>
      {children}
    </div>
  );
};

export default AnimatedText;
