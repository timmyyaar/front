"use client";
import React, { useState } from 'react';

import './style.scss';

export const InputForm = ({ t }: any) => {
  const [fEmail, setFEmail] = useState('');
  const [fPhone, setFPhone] = useState('');
  const [comment, setComment] = useState('');

  const onSend = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/gift', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({ fEmail, fPhone, comment }),
    });

    setFEmail('');
    setFPhone('');
    setComment('');
  };

  return (
    <div className="input-form-component">
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
        <div className="button-wrapper" onClick={onSend}>{t('send')}</div>
      </div>
    </div>
  );
};
