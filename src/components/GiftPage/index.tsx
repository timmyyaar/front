"use client";
import React, { FC } from 'react';
import Image from 'next/image';

import { Footer } from '@/components/Footer';
import { useLocales } from '@/hooks/useLocales';

import { Instruction } from '../CareerPage/Instruction';

import { InputForm } from './InputForm';
import aSvg from './icons/150.svg';
import bSvg from './icons/250.svg';
import cSvg from './icons/350.svg';
import dSvg from './icons/500.svg';
import './style.scss';

interface Props {
  locales: any;
}

export const GiftPage: FC<Props> = (props) => {
  const { locales } = props;
  const { t } = useLocales(locales);

  return (
    <div className="main-page">
      <div className="main-content _flex _flex-col" style={{ marginTop: '60px' }}>
        <div>
          <div className="career-title">{t('Gifts card')}</div>
          <div className="career-text">{t('Gifts card text')}</div>
        </div>
        <div className="_flex _justify-center">
          <div className="_grid _grid-cols-2 _gap-6">
            <Image src={aSvg} alt='' />
            <Image src={bSvg} alt='' />
            <Image src={cSvg} alt='' />
            <Image src={dSvg} alt='' />
          </div>
        </div>
        <div className="career-title">{t('How it works?')}</div>
        <Instruction title="gift" numberCards={5} t={t} />
        <div className="career-title">{t('Filling form')}</div>
        <InputForm t={t} />
        <div className="_flex _flex-col">
          <Footer t={t} />
        </div>
      </div>
    </div>
  );
};
