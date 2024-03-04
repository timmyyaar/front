import React from 'react';

import { Providers } from '@/components/Providers';
import { Header } from '@/components/Header';
import { SubscriptionPage as Page } from '@/components/SubscriptionPage';

import { getServerSideProps } from '../action';

export default async function SubscriptionPage() {
  const locales = await getServerSideProps();

  return (
    <Providers>
      <Header locales={locales} />
      <main>
        <Page locales={locales} />
      </main>
    </Providers>
  );
};
