import React, { useState } from 'react';
import Image from 'next/image';

import howItWorksSvg from '@/components/common/icons/howItWorks.svg';
import { Writer } from '@/components/common/Writer';
import { Overlay } from '@/components/common/Overlay';
import { CloseSvg } from '@/components/common/icons/closeButton';
import { useClickOutside } from '@/hooks/useClickOutSide';

import './style.scss';

export const Instruction = ({ title, numberCards, t }: any) => {
  const [active, setActive] = useState(false);
  const ref = useClickOutside(() => setActive(false));

  return (
    <div className="instruction-component">
      <Overlay active={active}>
        <div ref={ref}>
          <div className="overlay-wrapper-component" ref={ref}>
            <div className="icon-wrapper _cursor-pointer" onClick={() => setActive(false)}>
              <CloseSvg />
            </div>
            <div className="overlay-wrapper-component-title">
              <Writer text={t(title + '_modal_title')} />
            </div>
            <div className="overlay-wrapper-component-text">
              <Writer text={t(title + '_modal_text')} />
            </div>
          </div>
        </div>
      </Overlay>
      <div className="_flex _justify-center _gap-5">
        {[...new Array(numberCards)]
          .map((_, number) => ({ step: number + 1, text: 'un_hover_title_' + (number + 1) }))
          .map((el, i) => (
            <div className="step-card _flex _flex-col _justify-center" key={el.step}>
              <div className="un-hover-block">
                <div className="step-number">{el.step}</div>
                <div className="text-wrapper">
                  <b>{t(el.text)}</b>
                </div>
              </div>
              <div className="hover-block">
                {[...new Array(5)].map((_, j) => (
                  <div key={i + j}>
                    {t('hover_line_' + i + '_' + j)}
                  </div>
                ))}
              </div>
            </div>
          ))
        }
      </div>
      <div className="_flex _justify-center _gap-2" style={{ marginTop: '24px' }} onClick={() => setActive(true)}>
        <div className="_py-1 _cursor-pointer">
          <Image src={howItWorksSvg} alt='' />
        </div>
        <div>{t('Hover over a stage to see detailed information')}</div>
      </div>
    </div>
  );
};