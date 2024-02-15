"use client";
import React, { useState } from 'react';

import './style.scss';

export const InputForm = ({ t }: any) => {
  const [fEmail, setFEmail] = useState('');
  const [fPhone, setFPhone] = useState('');
  const [comment, setComment] = useState('');
  const [sEmail, setSEmail] = useState('');
  const [sName, setSName] = useState('');

  const onSend = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/gift', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({ fEmail, fPhone, comment, sEmail, sName }),
    });

    const data = await response.json();

    setFEmail('');
    setFPhone('');
    setComment('');
    setSEmail('');
    setSName('');
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
        <div className="input-wrapper">
          <input type="text" value={sEmail} onChange={(e) => setSEmail(e.target.value)} placeholder={t("Email")} />
        </div>
        <div className="input-wrapper">
          <input type="text" value={sName} onChange={(e) => setSName(e.target.value)} placeholder={t("Your phone number")} />
        </div>
      </div>
      <div className="_mb-6 _flex _flex-col _gap-3">
        <div className="button-wrapper" onClick={onSend}>{t('send')}</div>
      </div>
    </div>
  );
};