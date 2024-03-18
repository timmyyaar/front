import React, { FC, useState, useEffect } from 'react';
import Image from 'next/image';

import { CheckBox } from './components/Checkbox';

import { getCheckBoxByMainService } from './utils';
import airSvg from './icons/air-purifier.svg';
import addSvg from './icons/ant-design_plus-circle-filled.svg';
import keySvg from './icons/car-keys.svg';
import vacuumCleanerSvg from './icons/vacuum-cleaner.svg';
import './style.scss';

interface IProps {
  mainService: string;
  subServices: any[];
  setSubService: (service: any) => void;
  t: any;
}

export const CheckBoxesBlock: FC<IProps> = (props) => {
  const { mainService, subServices, setSubService, t } = props;
  const [dryCleaner, setDryCleaner] = useState(false);
  const [vacuumCleaner, setVacuumCleaner] = useState(false);
  const [keys, setKeys] = useState(false);
  const [oneMoreAddress, setOneMoreAddress] = useState(false);
  const [firstAddress, setFirstAddress] = useState('');
  const [secondAddress, setSecondAddress] = useState('');

  const checkBoxes = getCheckBoxByMainService(mainService);

  useEffect(() => {
    if (!firstAddress && !secondAddress) {
      setKeys(false);
    }
  }, [firstAddress, secondAddress]);

  useEffect(() => {
    if (!keys) {
      setOneMoreAddress(false);
      setFirstAddress('');
      setSecondAddress('');
    }
  }, [keys]);

  useEffect(() => {
    const keysSubService = subServices.filter(el => el.num === 1 && el.title === 'Keys_sub_service');

    if (firstAddress) {
      if (keysSubService.length) {
        setSubService((sS: any) => sS.map((el: any) => (el.num === 1 && el.title === 'Keys_sub_service') ? { ...el, address: firstAddress } : el));
      } else {
        setSubService((sS: any) => [...sS, { num: 1, title: 'Keys_sub_service', address: firstAddress, time: 30, price: 50 }]);
      }
    } else {
      setSubService((sS: any) => sS.filter((el: any) => el.title !== 'Keys_sub_service'));
    }
  }, [firstAddress]);

  useEffect(() => {
    const keysSubService = subServices.filter(el => el.num === 2 && el.title === 'Keys_sub_service');

    if (secondAddress) {
      if (keysSubService.length) {
        setSubService((sS: any) => sS.map((el: any) => (el.num === 2 && el.title === 'Keys_sub_service') ? { ...el, address: secondAddress } : el));
      } else {
        setSubService((sS: any) => [...sS, { num: 2, title: 'Keys_sub_service', address: secondAddress, time: 30, price: 50 }]);
      }
    } else {
      setSubService((sS: any) => sS.filter((el: any) => el.title !== 'Keys_sub_service'));
    }
  }, [secondAddress]);

  useEffect(() => {
    if (dryCleaner) {
      setSubService((sS: any) => [...sS, { title: 'Dry_cleaner_sub_service', time: 60, price: 50 }]);
    } else {
      setSubService((sS: any) => sS.filter((el: any) => el.title !== 'Dry_cleaner_sub_service'));
    }
  }, [dryCleaner]);

  useEffect(() => {
    if (vacuumCleaner) {
      setSubService((sS: any) => [...sS, { title: 'Vacuum_cleaner_sub_service', time: 0, price: 30 }]);
    } else {
      setSubService((sS: any) => sS.filter((el: any) => el.title !== 'Vacuum_cleaner_sub_service'));
    }
  }, [vacuumCleaner]);

  useEffect(() => {
    const dryCleanerSubService = subServices.filter(el => el.title === 'Dry_cleaner_sub_service');
    const vacuumCleanerSubService = subServices.filter(el => el.title === 'Vacuum_cleaner_sub_service');
    const keysSubService = subServices.filter(el => el.title === 'Keys_sub_service');

    if (!dryCleanerSubService.length) {
      setDryCleaner(false);
    }

    if (!vacuumCleanerSubService.length) {
      setVacuumCleaner(false);
    }

    if (!keysSubService.length) {
      setKeys(false);
    }
  }, [subServices]);

  return checkBoxes ? (
    <div className="check-boxes-block-component">
      {checkBoxes.includes('dry') ? (
        <CheckBox
          icon={airSvg}
          title={'title-dry-cleaner-checkbox'}
          subTitle={'sub-text-dry-cleaner-checkbox'}
          price={'50 zl'}
          // oldPrice={'60 zl'}
          setCheck={setDryCleaner}
          checked={dryCleaner}
          t={t}
        />
      ) : null}
      {checkBoxes.includes('vacuum cleaner') ? (
        <CheckBox
          icon={vacuumCleanerSvg}
          title={'title-vacuum-cleaner-checkbox'}
          subTitle={'sub-text-vacuum-cleaner-checkbox'}
          price={'20 zl'}
          oldPrice={mainService === 'Subscription' ? '30 zl' : ''}
          setCheck={setVacuumCleaner}
          checked={vacuumCleaner}
          t={t}
        />
      ) : null}
      {checkBoxes.includes('keys') ? (
        <div>
          <CheckBox
            icon={keySvg}
            title={'title-keys-checkbox'}
            subTitle={'sub-text-keys-checkbox'}
            price={'20 zl'}
            oldPrice={mainService === 'Subscription' ? '30 zl' : ''}
            setCheck={setKeys}
            checked={keys}
            t={t}
          />
          {keys ? (
            <div className="inputs-checkbox-wrapper">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={firstAddress}
                  onChange={(e) => setFirstAddress(e.target.value)}
                  placeholder={t("Address")}
                />
              </div>
              {oneMoreAddress ? (
                <div className="input-wrapper">
                  <input
                    type="text"
                    value={secondAddress}
                    onChange={(e) => setSecondAddress(e.target.value)}
                    placeholder={t("Address")}
                  />
                </div>
              ) : (
                <div className="add-more-btn-key-checkbox" onClick={() => setOneMoreAddress(true)}>
                  {t('Add one more')}
                  <div className="icon-wrapper-add-more">
                    <Image src={addSvg} alt="" />
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  ) : null;
};