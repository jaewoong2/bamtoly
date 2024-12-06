import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { DEFAULT_LABELS } from '@/lib/constants';
import { sleep } from '@/lib/utils';

import AnimatedText from './AnimatedText';

type Props = {
  labels?: string[];
  onChangeIndex?: (currentIndex: number) => void;
};

const AnimatedSteps = ({ onChangeIndex, labels = DEFAULT_LABELS }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [steps, setSteps] = useState<number[]>();

  const onChangeChcked = (index: number) => async (checked: boolean) => {
    if (index + 1 >= labels.length) return;
    if (onChangeIndex) {
      onChangeIndex(index);
    }
    if (checked && index === currentIndex) {
      await sleep(500);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setSteps((prev) => {
      const newSet = new Set(prev);
      newSet.add(currentIndex);
      return [...newSet];
    });
  }, [currentIndex]);

  return (
    <div className='flex h-[100%] w-full flex-col justify-center gap-2'>
      {steps?.map((index) => (
        <motion.div
          key={labels[index]}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedText
            className='w-full'
            onChecked={onChangeChcked(index)}
            key={labels[index]}
            label={`${index + 1}. ${labels[index]}`}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default React.memo(AnimatedSteps);
