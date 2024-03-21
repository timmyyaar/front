"use client";
import React, { useState } from 'react';

import { ModalRequest } from '@/components/common/ModalRequest';
import { Overlay } from '@/components/common/Overlay';
import { useClickOutside } from '@/hooks/useClickOutSide';
import './style.scss';

export const InputForm = ({ t }: any) => {
  const [fEmail, setFEmail] = useState('');
  const [fPhone, setFPhone] = useState('');
  const [comment, setComment] = useState('');

  const [modal, setModal] = useState(false);
  const ref = useClickOutside(() => setModal(false));

  const requiredFields = fEmail || fPhone;

  const onSend = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/gift', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({ fEmail, fPhone, comment }),
    });

    const data = await response.json();

    if (data.gift.id) {
      setModal(true);
    }

    setFEmail('');
    setFPhone('');
    setComment('');
  };

  return (
    <div className="input-form-component">
      <Overlay active={modal}>
        <div ref={ref}>
          <ModalRequest
            text={t('gift_page_modal_title')}
            title={t('gift_page_modal_text')}
            onClose={() => setModal(false)}
          />
        </div>
      </Overlay>
      <div className="_mb-6 _flex _flex-col _gap-4">
        <div className="input-wrapper">
          <input type="text" value={fEmail} onChange={(e) => setFEmail(e.target.value)} placeholder={t("Email where to send gift")} />
        </div>
        <div className="input-wrapper">
          <input type="text" value={fPhone} onChange={(e) => setFPhone(e.target.value)} placeholder={t("Phone number where to send the code")} />
        </div>
        <div className="input-wrapper text-about-input">
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder={t("Accompanying text")} />
        </div>
      </div>
      <div className="_mb-6 _flex _flex-col _gap-3">
        <div
          className={`button-wrapper ${!requiredFields ? 'order-wrapper-disabled' : ''}`}
          onClick={() => {
            if (requiredFields) onSend();
          }}
        >
          {t('send')}
        </div>
      </div>
    </div>
  );
};
