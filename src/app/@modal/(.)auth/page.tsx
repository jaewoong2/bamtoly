'use client';

import LoginAuthPage from '@/app/auth/page';
import { User } from '@/atoms/types';
import withAuth from '@/components/hoc/withAuth';

type Props = {
  user: User;
};

const AuthPage = ({ user }: Props) => {
  return <LoginAuthPage user={user} />;
};

export default withAuth(AuthPage, { isCreator: false });
