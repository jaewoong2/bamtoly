import { CalendarDays, CheckCircle, Gift } from 'lucide-react';
import React, { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const ProfileContents = () => {
  const [user] = useState({
    name: '김철수',
    avatar: '/placeholder.svg?height=40&width=40',
    points: 500,
    participations: 10,
    wins: 3,
  });

  return (
    <Card className='shadow-none'>
      <CardHeader>
        <CardTitle>사용자 프로필</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='flex items-center justify-between'>
          <span className='flex items-center space-x-2'>
            <CalendarDays className='h-4 w-4' />
            <span>총 참여 횟수:</span>
          </span>
          <span>{user.participations}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='flex items-center space-x-2'>
            <Gift className='h-4 w-4' />
            <span>당첨 횟수:</span>
          </span>
          <span>{user.wins}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='flex items-center space-x-2'>
            <CheckCircle className='h-4 w-4' />
            <span>당첨률:</span>
          </span>
          <span>{((user.wins / user.participations) * 100).toFixed(1)}%</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileContents;
