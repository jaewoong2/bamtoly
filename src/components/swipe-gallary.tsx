import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import React, { useRef, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Tab {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface SwipeableTabsProps {
  tabs: Tab[];
}

const SwipeableTabs: React.FC<SwipeableTabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();

  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x > threshold && activeIndex > 0) {
      setActiveTab(tabs[activeIndex - 1].id);
    } else if (info.offset.x < -threshold && activeIndex < tabs.length - 1) {
      setActiveTab(tabs[activeIndex + 1].id);
    }
    controls.start({ x: 0 });
  };

  const containerWidth = useMotionValue(0);
  React.useEffect(() => {
    if (containerRef.current) {
      containerWidth.set(containerRef.current.offsetWidth);
    }
  }, [containerWidth]);

  const leftTabX = useTransform(x, [0, containerWidth.get()], [-100, 0]);
  const rightTabX = useTransform(x, [-containerWidth.get(), 0], [0, 100]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className='h-full w-full'>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      <motion.div
        className='h-full'
        ref={containerRef}
        style={{ x }}
        drag='x'
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        animate={controls}
      >
        {tabs.map((tab, index) => (
          <motion.div
            key={tab.id}
            style={{
              x: index === activeIndex - 1 ? leftTabX : index === activeIndex + 1 ? rightTabX : 0,
              opacity: index === activeIndex ? 1 : 0.5,
            }}
          >
            <TabsContent value={tab.id}>{tab.content}</TabsContent>
          </motion.div>
        ))}
      </motion.div>
    </Tabs>
  );
};

export default SwipeableTabs;
