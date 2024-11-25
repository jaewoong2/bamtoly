import React, { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const Navigation = () => {
  const [user] = useState({
    name: '김철수',
    avatar: '/placeholder.svg?height=40&width=40',
    points: 500,
    participations: 10,
    wins: 3,
  });

  return (
    <header className='mb-6 flex items-center justify-between rounded-lg bg-gradient-to-r p-4'>
      <h1 className='text-2xl font-light'>통통</h1>
      <div className='flex items-center space-x-4'>
        <Avatar>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className='font-semibold'>{user.name}</p>
          <p className='text-sm'>포인트: {user.points}</p>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
