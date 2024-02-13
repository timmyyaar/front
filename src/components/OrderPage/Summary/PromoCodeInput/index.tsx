import React, { FC, useState } from 'react';

import { DiscountCoupon } from '../icons/DiscountCoupon';

interface IProps {
  setSale: any
  t: any
}

export const PromoInput: FC<IProps> = (props) => {
  const { setSale, t } = props;
  const [code, setCode] = useState('');

  const checkCode = async () => {
    if (code) {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/promo/' + code, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      });
      const data = await response.json();

      if (data.promo.sale) {
        setSale(+data.promo.sale);
      }
    }
  }

  return (
    <div className="input-promo-code _cursor-pointer">
      <div className="input-wrapper _flex">
        <div className="icon-wrapper">
          <DiscountCoupon />
        </div>
        <input
          className="input" type="text"
          value={code} onChange={(e) => setCode(e.target.value)}
        />
        <div className="button-wrapper" onClick={checkCode}>
          {t('Apply')}
        </div>
      </div>
    </div>
  );
};