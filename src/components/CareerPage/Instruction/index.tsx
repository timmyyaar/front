import React from 'react';

import './style.scss';

export const Instruction = ({ title, numberCards, t }: any) => {
  return (
    <div className="instruction-component">
      <div className="_flex _justify-center _gap-5">
        {[...new Array(numberCards)]
          .map((_, number) => ({ step: number + 1, text: 'un_hover_' + title +'_' + (number + 1) }))
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
                    {t('hover_line_' + title + '_' + + i + '_' + j)}
                  </div>
                ))}
              </div>
            </div>
          ))
        }
      </div>
      <div className="_flex _justify-center _gap-2" style={{ marginTop: '24px', color: '#5C5C5C' }}>
        <div>{t('Hover over a stage to see detailed information')}</div>
      </div>
    </div>
  );
};