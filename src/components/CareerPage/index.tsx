"use client";
import React, { FC } from 'react';

import { Footer } from '@/components/Footer';
import { useLocales } from '@/hooks/useLocales';

import { Benefits } from './Benefits';
import { InputForm } from './InputForm';
import { Instruction } from './Instruction';
import './style.scss';

interface Props {
  locales: any;
}

export const CareerPage: FC<Props> = (props) => {
  const { locales } = props;
  const { t } = useLocales(locales);

  return (
    <div className="career-page">
      <div className="career-content _flex _flex-col" style={{ marginTop: '60px' }}>
        <div className="career-title">
          {t('Do you want to join T⅄T team?')}
        </div>
        <Benefits t={t} />
        <div className="career-title">
          {t('How to join?')}
        </div>
        <Instruction title={'career'} numberCards={3} t={t} />
        <div className="career-title">
          {t('Filling form')}
        </div>
        <InputForm t={t} />
        <div className="_flex _flex-col">
          <Footer t={t} />
        </div>
      </div>
    </div>
  );
};
