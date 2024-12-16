import Link from 'next/link';
import { redirect } from 'next/navigation';

import eventService from '@/apis/services/event/eventService';
import userService from '@/apis/services/user/userService';
import AuthComponent from '@/components/blocks/AuthComponent';
import { buttonVariants } from '@/components/ui/button';

import { columns } from './columns';
import { DataTable } from './components/data-table';

const EventDetailPage = async () => {
  const user = await userService.getMe();
  const event = await eventService.getAllEvents(1, {}, { userName: user.data?.userName, take: 100 });

  if (user.data?.provider === 'email') {
    redirect('/');
  }

  if (!user.data?.id) {
    return <AuthComponent />;
  }

  return (
    <div className='container mx-auto py-10'>
      <div className='flex items-center gap-2 text-lg font-bold'>
        <div className='h-4 w-4 rounded-md bg-green-400' />
        {user.data?.userName}님의 이벤트
      </div>
      {event.data.data && (
        <DataTable
          header={
            <Link
              className={buttonVariants({ className: 'text-sm', size: 'sm', variant: 'outline' })}
              href={'/event/create'}
            >
              이벤트 만들기
            </Link>
          }
          columns={columns}
          data={event.data.data}
        />
      )}
    </div>
  );
};

export default EventDetailPage;
