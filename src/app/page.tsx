import MainEvents from '@/components/blocks/MainEvents';
import MainRightSection from '@/components/blocks/MainRightSection';

export default function Main() {
  return (
    <div className='container mx-auto p-4'>
      <div className='mx-auto h-full w-full max-w-md'></div>
      <div className='grid grid-cols-3 gap-6'>
        <div className='order-2 col-span-3 flex h-full gap-6 md:order-1 md:col-span-2'>
          <MainEvents />
        </div>
        <div className='order-1 col-span-3 pr-4 md:order-2 md:col-span-1'>
          <MainRightSection />
        </div>
      </div>
    </div>
  );
}
