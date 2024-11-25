'use client';

import React from 'react';

type Props = {};

const ErrorPage = ({ ...props }: Props) => {
  return <div>{JSON.stringify(props)}</div>;
};

export default ErrorPage;
