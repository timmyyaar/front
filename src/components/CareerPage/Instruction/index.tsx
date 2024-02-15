import React from 'react';

import './style.scss';

export const Instruction = ({ t }: any) => {
  return (
    <div className="instruction-component">
      <div className="_flex _justify-center _gap-5">
        {[
          { step: 1, text: 'Fill application form' },
          { step: 2, text: 'Schedule an interview' },
          { step: 3, text: 'Sign the contract' },
        ].map((el, i) => (
          <div className="step-card _flex _flex-col _justify-center" key={el.step}>
            <div className="un-hover-block">
              <div className="step-number">{el.step}</div>
              <div className="text-wrapper">
                <b>{t(el.text)}</b>
              </div>
            </div>
            <div className="hover-block">
              {[...new Array(5)].map((_, j) => (
                <div key={el.text}>
                  {t('hover_line_' + i + '_' + j)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};