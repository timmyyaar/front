import React from 'react';

import { Providers } from '@/components/Providers';
import { Header } from '@/components/Header';
import { GiftPage as Page } from '@/components/GiftPage';

import { getServerSideProps } from '../action';

export default async function GiftPage() {
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
