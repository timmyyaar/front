import React from 'react';
import Image from 'next/image';

import { Writer } from '@/components/common/Writer';
import closeSvg from '@/components/common/icons/closeButton.svg';

import window0 from './images/0.png';
import window1 from './images/1.png';
import window2 from './images/2.png';
import window3 from './images/3.png';
import window4 from './images/4.png';
import window5 from './images/5.png';

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
      <div className="_flex _justify-center">
        <div className="wrapper-modal-reg-list">
          {[...new Array(lines)].map((_, i) => (
            <div className="wrapper-modal-reg-item" key={'wrapper-modal-reg-list' + i}>
              <div className="wrapper-modal-reg-item-text">
                <Writer text={t(title + '_block_text_' + i)} />
              </div>
            </div>
          ))}
        </div>
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
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
          <g clip-path="url(#clip0_7215_35090)">
            <path d="M4.39573 25.6048C2.96308 24.2211 1.82034 22.5659 1.03421 20.7358C0.248073 18.9058 -0.16572 16.9375 -0.183027 14.9458C-0.200335 12.9541 0.179191 10.9789 0.933404 9.13544C1.68762 7.292 2.80141 5.61722 4.2098 4.20883C5.6182 2.80044 7.29297 1.68664 9.13642 0.932428C10.9799 0.178214 12.9551 -0.201311 14.9467 -0.184004C16.9384 -0.166697 18.9067 0.247097 20.7368 1.03323C22.5669 1.81937 24.222 2.9621 25.6057 4.39475C28.3381 7.22379 29.85 11.0128 29.8158 14.9458C29.7817 18.8787 28.2041 22.6409 25.423 25.422C22.6419 28.2032 18.8797 29.7807 14.9467 29.8149C11.0138 29.849 7.22476 28.3371 4.39573 25.6048ZM6.51073 23.4898C8.76242 25.7414 11.8164 27.0064 15.0007 27.0064C18.1851 27.0064 21.239 25.7414 23.4907 23.4898C25.7424 21.2381 27.0074 18.1841 27.0074 14.9998C27.0074 11.8154 25.7424 8.76144 23.4907 6.50975C21.239 4.25806 18.1851 2.99308 15.0007 2.99308C11.8164 2.99308 8.76242 4.25806 6.51073 6.50975C4.25904 8.76144 2.99406 11.8154 2.99406 14.9998C2.99406 18.1841 4.25904 21.2381 6.51073 23.4898ZM21.3607 10.7548L17.1157 14.9998L21.3607 19.2448L19.2457 21.3598L15.0007 17.1148L10.7557 21.3598L8.64073 19.2448L12.8857 14.9998L8.64073 10.7548L10.7557 8.63975L15.0007 12.8848L19.2457 8.63975L21.3607 10.7548Z" fill="#232323"/>
          </g>
          <defs>
            <clipPath id="clip0_7215_35090">
              <rect width="30" height="30" fill="white"/>
            </clipPath>
          </defs>
        </svg>
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
        {title === 'Window cleaning' ? (
          <div className="wrapper-title-text">
            <div className="wrapper-title">
              <Writer text={t(title + '_title')} />
            </div>
            <div className="_grid _grid-cols-3 _gap-2">
              {[...new Array(6)].map((_, i) => {
                const windowImg = { 0: window0, 1: window1, 2: window2, 3: window3, 4: window4, 5: window5 };

                return (
                  <div className="window-block">
                    <div className="img-wrapper">
                      {/* @ts-ignore */}
                      <Image src={windowImg[i]} alt=""/>
                    </div>
                    <div className="title">
                      {[...new Array(3)].map((_, j) => (
                        <Writer text={t(title + '_text_' + i + '_' + j)} key={title + '_' + j} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}
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
              {renderGrid([5, 8])}
            </div>
            {renderBlock(4)}
          </>
        ) : null}
        {title === 'Move in/out' ? (
          <>
            <div className="wrapper-title-text">
              <div className="wrapper-title">
                <Writer text={t(title + '_title')} />
              </div>
              <div className="wrapper-text in-line" style={{ marginBottom: '80px' }}>
                {[...new Array(2)].map((_, i) => !(i%2) ? (
                  <b key={'Move-bold-second_line' + i*10}>
                    <Writer text={t(title + '_text_first_line_bold' + i)} />
                  </b>
                ) : (
                  <Writer text={t(title + '_text_first_line_' + i)} key={'Move_bold-line-' + i*10}/>
                ))}
                {[...new Array(2)].map((_, i) => (
                  <Writer text={t(title + '_text_line_' + i)} key={'Move_bold-line-' + i*10}/>
                ))}
              </div>
              {renderGrid([7, 5, 5, 5])}
            </div>
          </>
        
        ) : null}
        {title === 'Ozonation' ? (
          <>
            <div className="wrapper-title-text">
              <div className="wrapper-title">
                <Writer text={t(title + '_title')} />
              </div>
            </div>
            <div style={{ marginBottom: '80px' }}>
              {[...new Array(5)].map((_, i) => (
                <Writer text={t(title + 'text_line_' + i)} key={title + '_' + i} />
              ))}
              <div className="_text-center">
                <Writer text={t(title + 'last_line')} />
              </div>
            </div>
            <div className="wrapper-title-text">
              <div className="wrapper-title">
                <Writer text={t(title + '_second_title')} />
              </div>
            </div>
            <div style={{ marginBottom: '80px' }}>
              {[...new Array(2)].map((_, i) => (
                <Writer text={t(title + 'text_line_second' + i)} key={title + '_' + i} />
              ))}
              <div className="wrapper-title" style={{ marginBottom: '32px' }}>
                <Writer text={t(title + '_third_title')} />
              </div>
              <div className="_flex _flex-row _justify-between" style={{ marginBottom: '32px', gap: '21px' }}>
                {[
                  'Wet cleaning and sealing of rooms',
                  'Isolation of pets and indoor plants',
                  'Cover artwork and protect electronic equipment',
                  'Adjustment of the equipment for work',
                  'Ventilation'
                ].map((el, i) => (
                  <div className='step-card ozonation-step' style={{ width: '18%', height: '250px' }}>
                    <div className='number-wrapper'>
                      <div className='number'>
                        {i+1}
                      </div>
                    </div>
                    <div className='name'>
                      <Writer text={t(el + '_airbnb_title')} />
                    </div>
                    <div className='hover-block'>
                      <div className='hover-block-text'>
                        {[...new Array(4)].map((_, i) => (
                          <Writer text={t(title + '_text_hover_line_' + i)} key={title + '_hover_' + i} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="reminder_text">
                <Writer text={t(title + 'reminder_text')} />
              </div>
            </div>
          </>
        ) : null}
        {title === 'Subscription' ? renderText(9) : null}
        {title === 'In a last minute' ? (
          <>
            <div style={{ marginBottom: '80px' }}>
              {renderText(4)}
            </div>
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
                <Writer text={t(title + '_text_custom-last-line-' + i)} />
              </div>
            ))}
          </>
        ) : null}
        {title === 'After party' ? (
          <>
            <div style={{ marginBottom: '80px' }}>
              {renderText()}
            </div>
            {renderGrid([7, 5, 5, 5])}
          </>
        ) : null}
        {title === 'Office' ? renderGrid([2, 2, 2, 2, 2, 1]) : null}
        {title === 'While sickness' ? renderBlock(6) : null}
        {title === 'Deep kitchen' ? (
          <>
            <div className="wrapper-title-text">
              <div className="wrapper-title">
                <Writer text={t(title + '_title')} />
              </div>
              <div className="wrapper-text in-line" style={{ marginBottom: '80px' }}>
                {[...new Array(3)].map((_, i) => i%2 ? (
                  <b key={'Deep-kitchen-bold-line-' + i*10}>
                    <Writer text={t(title + '_text_bold' + i)} />
                  </b>
                ) : (
                  <Writer text={t(title + '_text_' + i)} key={'Deep-kitchen-line-' + i*10}/>
                ))}
                {[...new Array(2)].map((_, i) => i%2 ? (
                  <b key={'Deep-kitchen-second-bold-line-' + i*10}>
                    <Writer text={t(title + '_second_text_bold' + i)} />
                  </b>
                ): (
                  <Writer text={t(title + '_second_text_' + i)} key={'Deep-kitchen-second-line-' + i*10}/>
                ))}
              </div>
              <div className="wrapper-modal-reg">
                <div className="wrapper-modal-reg-title">
                  <Writer text={t(title + '_block_title')} />
                </div>
                <div className="wrapper-modal-reg-list-row _justify-between">
                  {[...new Array(4)].map((_, i) => (
                    <div key={'Deep-kitchen_list_block' + i * 100}>
                      {[...new Array(4)].map((_, j) => (
                        <div className="wrapper-modal-reg-item" key={'Deep-kitchen_list_block' + j * 100}>
                          <div className="wrapper-modal-reg-item-text">
                            <Writer text={t(title + '_text_list_' + i + "_" + j)} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : null}
        {title === 'Airbnb' ? (
          <div className="wrapper-title-text">
            <div className="wrapper-title">
              <Writer text={t(title + '_title')} />
            </div>
            <div className="wrapper-text in-line" style={{ marginBottom: '80px' }}>
              <Writer text={t(title + '_text_first_line')} key={'Airbnb-first-line'}/>
              {[...new Array(2)].map((_, i) => i%2 ? (
                <b key={'Airbnb-bold-second_line' + i*10}>
                  <Writer text={t(title + '_text_second_line_bold' + i)} />
                </b>
              ) : (
                <Writer text={t(title + '_text_second_line_' + i)} key={'Airbnb_bold-line-' + i*10}/>
              ))}
              <Writer text={t(title + '_text_last_line')} key={'Airbnb-last-line'}/>
            </div>
            <div className="wrapper-title" style={{ marginBottom: '32px' }}>
              <Writer text={t(title + '_second_title')} />
            </div>
            <div className="_flex _flex-row _justify-between" style={{ gap: '21px' }}>
              {['Prepare', 'Cleaning', 'Sanitize', 'Finish'].map((el, i) => (
                <div className='step-card'>
                  <div className='number-wrapper'>
                    <div className='number'>
                      {i+1}
                    </div>
                  </div>
                  <div className='name'>
                    {t(el + '_airbnb_title')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}