'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { User } from '@/atoms/types';
import withAuth from '@/components/hoc/withAuth';
import { useToast } from '@/hooks/use-toast';

type Props = {
  user: User;
};

const AuthPage = ({ user }: Props) => {
  const { toast } = useToast();
  const { replace } = useRouter();
  const isMount = useIsMounted();

  useEffect(() => {
    if (user && isMount()) {
      replace('/');
    }
  }, [user, toast, isMount]);

  return null;
};

export default withAuth(AuthPage, { isCreator: false });
