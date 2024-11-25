import React from 'react';

import userService from '@/apis/services/user/userService';

import UserEventsTable from './components/UserEventsTable';

const UserPage = async () => {
  const user = await userService.getMe();

  return (
    <div>
      {user.data?.userName}
      <UserEventsTable />
    </div>
  );
};

export default UserPage;
