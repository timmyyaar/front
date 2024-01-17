import React from 'react';
import Image from 'next/image';

import { Writer } from '@/components/common/Writer';
import closeSvg from '@/components/common/icons/closeButton.svg';

import './style.scss';

export const Modals = ({ title, onClose, t }: { title: string, onClose: () => void, t: any }) => {
  const renderText = (number: number = 1) => (
    <div className="wrapper-title-text">
      <div className="wrapper-title">
        <Writer text={t(title + '_title')} />
      </div>
      <div className="wrapper-text">
        {[...new Array(number)].map((_, i) => (
          <Writer text={t(title + '_text_' + i)} />
        ))}
      </div>
    </div>
  );

  const renderBlock = (lines: number) => (
    <div className="wrapper-modal-reg">
      <div className="wrapper-modal-reg-title">
        <Writer text={t(title + '_block_title')} />
      </div>
      <div className="wrapper-modal-reg-list">
        {[...new Array(lines)].map((_, i) => (
          <div className="wrapper-modal-reg-item">
            <div className="wrapper-modal-reg-item-text">
              <Writer text={t(title + '_block_text_' + i)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderGrid = (gridLists: number[]) => (
    <div className="_grid _grid-cols-2 _gap-6">
      {gridLists.map((lines, i) => (
        <div className="wrapper-modal-reg">
          <div className="wrapper-modal-reg-title">
            <Writer text={t(title + '_title_' + i)} />
          </div>
          <div className="wrapper-modal-reg-list">
            {[...new Array(lines)].map((_, j) => (
              <div className="wrapper-modal-reg-item">
                <div className="wrapper-modal-reg-item-text">
                  <Writer text={t(title + '_text_' + i + '_' + j)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderEcoText = () => (
    <div className="wrapper-title-text">
      <div className="wrapper-title">
        <Writer text={t(title + '_title_eco')} />
      </div>
      <div className="wrapper-text">
        {[...new Array(5)].map((_, i) => (
          <Writer text={t(title + '_text_eco_' + i)} />
        ))}
        <div className="in-line">
          {[...new Array(6)].map((_, j) => j%2 ? (
            <b>
              <Writer text={t(title + '_text_eco_last_line_' + j)} />
            </b>
          ) : (
            <Writer text={t(title + '_text_eco_last_line_' + j)} />
          ))}
        </div>
        <br />
        <br />
        <div>
          <Writer text={t(title + '_text_eco_last-block_1')} />
          <Writer text={t(title + '_text_eco_last-block_2')} />
          <Writer text={t(title + '_text_eco_last-block_3')} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="modal-wrapper-component">
      <div className="icon-wrapper-modal" onClick={onClose}>
        <Image src={closeSvg} alt='' />
      </div>
      <div>
        {title === 'Regular' ? renderGrid([7, 5, 5, 5]) : null}
        {title === 'Dry cleaning' ? renderGrid([2, 2, 2, 1]) : null}
        {title === 'Deep' ? (
          <div className="_flex _flex-col _gap-7">
            {renderGrid([9, 8, 7, 7])}
            {renderBlock(3)}
          </div>
        ) : null}
        {title === 'Window cleaning' ? 'x' : null}
        {title === 'Eco cleaning' ? (
          <>
            <div style={{ marginBottom: '24px' }}>
              {renderText(2)}
            </div>
            <div style={{ marginBottom: '80px' }}>
              {renderEcoText()}
            </div>
            {renderGrid([7, 5, 5, 5])}
          </>
        ) : null}
        {title === 'Post-construction' ? (
          <>
            <div style={{ marginBottom: '80px' }}>
              {renderText(2)}
            </div>
            <div style={{ marginBottom: '24px' }}>
              {renderGrid([6, 8])}
            </div>
            {renderBlock(4)}
          </>
        ) : null}
        {title === 'Move in/out' ? 'x' : null}
        {title === 'Ozonation' ? 'x' : null}
        {title === 'Subscription' ? renderText(9) : null}
        {title === 'In a last minute' ? (
          <>
            {renderText(4)}
            {renderGrid([7, 5, 5, 5])}
          </>
        ) : null}
        {title === 'Custom cleaning' ? (
          <>
            {renderText(2)}
            <div className="in-line _text-center">
              {[...new Array(3)].map((_, i) => i%2 ? (
                <b key={'Custom-bold-line-' + i*100}>
                  <Writer text={t(title + '_text_custom' + i)} />
                </b>
              ) : (
                <div key={'Custom-bold-line-' + i*100}>
                  <Writer text={t(title + '_text_custom' + i)} />
                </div>
              ))}
            </div>
            {[...new Array(2)].map((_, i) => (
              <div className="_text-center" key={'Custom-last-line-' + i*100}>
                <Writer text={t(title + '_text_custom-last-line-1')} />
              </div>
            ))}
          </>
        ) : null}
        {title === 'After party' ? (
          <>
            {renderText()}
            {renderGrid([7, 5, 5, 5])}
          </>
        ) : null}
        {title === 'Office' ? renderGrid([2, 2, 2, 2, 2, 1]) : null}
        {title === 'While sickness' ? renderBlock(6) : null}
        {title === 'Deep kitchen' ? 'x' : null}
        {title === 'Airbnb' ? 'x' : null}
      </div>
    </div>
  );
}