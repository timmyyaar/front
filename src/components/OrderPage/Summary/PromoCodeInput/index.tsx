import React, { FC, useState } from 'react';

import { DiscountCoupon } from '../icons/DiscountCoupon';

interface IProps {
  setSale: any
  setPromo: any
  t: any
}

export const PromoInput: FC<IProps> = (props) => {
  const { setSale, setPromo, t } = props;
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('#F9F9F9');

  const checkCode = async () => {
    if (code) {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/promo/' + code, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
        });
        const data = await response.json();

        if (data?.promo?.sale) {
          setStatus('#82D46D');
          setSale(+data.promo.sale);
          setPromo(code);
        } else if (data?.message === 'Promo not found') {
          setStatus('#FF8C8C');
        }
    }
  }

  return (
    <div className="input-promo-code _cursor-pointer">
      <div className="input-wrapper _flex" style={{ background: status }}>
        <div className="icon-wrapper">
          <DiscountCoupon />
        </div>
        <input
          type="text" placeholder={t('Promo code')}
          className={`input promo-code-input ${status === '#F9F9F9' ? '' : 'promo-status'}`}
          style={{ background: status, color: status === '#F9F9F9' ? '#848484' : '#FFF' }}
          value={code} onChange={(e) => setCode(e.target.value)}
          
        />
        <div className="button-wrapper" onClick={checkCode}>
          {t('Apply')}
        </div>
      </div>
    </div>
  );
};