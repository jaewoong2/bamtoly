import Link from 'next/link';

import gifticonService from '@/apis/services/gifticon/gifticonService';
import userService from '@/apis/services/user/userService';
import AuthComponent from '@/components/blocks/AuthComponent';
import { buttonVariants } from '@/components/ui/button';

import { columns } from './columns';
import { DataTable } from './components/data-table';

const EventDetailPage = async () => {
  const user = await userService.getMe();
  const gifticons = await gifticonService.findAll({ page: 1, claimedBy: user?.data?.id, take: 100 });

  if (!user.data?.id) {
    return <AuthComponent />;
  }

  return (
    <div className='container mx-auto py-10'>
      <div className='flex items-center gap-2 text-lg font-bold'>
        <div className='h-4 w-4 rounded-md bg-green-400' />
        당첨된 기프티콘
      </div>
      {gifticons.data?.data && <DataTable columns={columns} data={gifticons.data.data} />}
    </div>
  );
};

export default EventDetailPage;
