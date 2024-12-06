import { ArrowLeftIcon, Loader, LoaderIcon } from 'lucide-react';
import Link from 'next/link';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';

import AnimatedSteps from '@/app/event/components/AnimatedSteps';
import { Block as BlockType } from '@/atoms/types';
import { cn } from '@/lib/utils';

import { Button, buttonVariants } from '../ui/button';

interface BlockProps {
  block: BlockType;
  children?: (block: React.ReactNode) => React.ReactNode;
  isAvailable?: boolean;
  isLoading?: boolean;
  onClickCTAButton?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Block: React.FC<BlockProps> = ({ block, children, isAvailable, isLoading, onClickCTAButton }) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (typeof block.content.time === 'number') {
      const timer = setTimeout(() => {
        setIsShow(true);
      }, block.content.time);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [block]);

  const renderContent = () => {
    switch (block.type) {
      case 'paragraph':
        return <p className='text-gray-700'>{block.content.texts[0]}</p>;
      case 'heading_1':
        return <h1 className='mb-4 text-4xl font-bold'>{block.content.texts[0]}</h1>;
      case 'heading_2':
        return <h2 className='mb-3 text-3xl font-semibold'>{block.content.texts[0]}</h2>;
      case 'heading_3':
        return <h3 className='mb-2 text-2xl font-medium'>{block.content.texts[0]}</h3>;
      case 'bulleted_list':
        return <ul className='list-inside list-disc'>{block.content.texts[0]}</ul>;
      case 'numbered_list':
        return <ol className='list-inside list-decimal'>{block.content.texts[0]}</ol>;
      case 'to_do':
        return (
          <div className='flex items-center'>
            <input type='checkbox' className='mr-2' />
            <span>{block.content.texts[0]}</span>
          </div>
        );
      case 'toggle':
        return (
          <details className='mb-2'>
            <summary>{block.content.texts[0]}</summary>
          </details>
        );
      case 'code':
        return (
          <pre className='rounded bg-gray-100 p-4'>
            <code>{block.content.texts[0]}</code>
          </pre>
        );
      case 'image':
        return <img src={block.content.texts[0]} alt='Block image' className='h-auto max-w-full' />;
      case 'quote':
        return <blockquote className='border-l-4 border-gray-300 pl-4 italic'>{block.content.texts[0]}</blockquote>;
      case 'divider':
        return <hr className='my-4' />;
      case 'callout':
        return (
          <div className='mb-4 border-l-4 border-blue-500 bg-blue-100 p-4 text-blue-700'>{block.content.texts[0]}</div>
        );
      case 'auto-checkbox':
        return <AnimatedSteps labels={block.content.texts} />;
      case 'cta-button':
        return (
          <div className={cn('grid w-full grid-cols-2 gap-5', !isAvailable && 'grid-cols-3')}>
            {!isAvailable && (
              <Link
                className={buttonVariants({ className: 'animate-fade-right px-2', variant: 'secondary' })}
                href={'/'}
              >
                <ArrowLeftIcon /> <span>돌아가기</span>
              </Link>
            )}
            <Button className='col-span-2 transition' disabled={isLoading || !isShow} onClick={onClickCTAButton}>
              {isLoading ? <LoaderIcon className='animate-spin' /> : block.content.texts[0]}
            </Button>
          </div>
        );
      default:
        return <p>{block.content.texts[0]}</p>;
    }
  };

  return (
    <div className={cn('mb-4', block.type === 'divider' ? 'my-8' : '')}>
      {children ? children(renderContent()) : renderContent()}
      {block.children && block.children.map((childBlock) => <Block key={childBlock.id} block={childBlock} />)}
    </div>
  );
};
