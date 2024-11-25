import { cookies } from 'next/headers';
import React from 'react';

import { NextPageProps } from '@/lib/type';

import ClientLoginPage from './LoginPage';

const LoginPage = async ({ searchParams }: NextPageProps<null, { code: string; redirectUrl?: string }>) => {
  const accessToken = (await cookies()).get('access_token');
  const { code, redirectUrl } = await searchParams;

  return <ClientLoginPage code={code} redirectUrl={redirectUrl} accessToken={accessToken?.value} />;
};

export default LoginPage;
