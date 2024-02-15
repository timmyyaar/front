"use client";
import React, { FC } from 'react';

import { Footer } from '@/components/Footer';
import { useLocales } from '@/hooks/useLocales';

import './style.scss';

interface Props {
  locales: any;
}

export const GiftPage: FC<Props> = (props) => {
  const { locales } = props;
  const { t } = useLocales(locales);

  return (
    <div className="main-page">
      <div className="main-content _flex _flex-col">
        <div className="_flex _flex-col">
          <Footer t={t} />
        </div>
      </div>
    </div>
  );
};
