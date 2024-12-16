import { redirect } from 'next/navigation';

import gifticonService from '@/apis/services/gifticon/gifticonService';
import userService from '@/apis/services/user/userService';
import AuthComponent from '@/components/blocks/AuthComponent';

import { columns } from './columns';
import { DataTable } from './components/data-table';

const EventDetailPage = async () => {
  const user = await userService.getMe();
  const gifticons = await gifticonService.findAll({ page: 1, claimedBy: user?.data?.id, take: 100 });

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
        내가 받은 선물
      </div>
      {gifticons.data?.data && <DataTable columns={columns} data={gifticons.data.data} />}
    </div>
  );
};

export default EventDetailPage;
