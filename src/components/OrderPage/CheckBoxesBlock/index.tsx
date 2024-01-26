import React, { FC, useState, useEffect } from 'react';
import Image from 'next/image';

import { CheckBox } from './components/Checkbox';

import { getCheckBoxByMainService } from './utils';
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
        setSubService((sS: any) => [...sS, { num: 1, title: 'Keys_sub_service', address: firstAddress }]);
      }
    }
  }, [firstAddress]);

  useEffect(() => {
    const keysSubService = subServices.filter(el => el.num === 2 && el.title === 'Keys_sub_service');

    if (secondAddress) {
      if (keysSubService.length) {
        setSubService((sS: any) => sS.map((el: any) => (el.num === 2 && el.title === 'Keys_sub_service') ? { ...el, address: secondAddress } : el));
      } else {
        setSubService((sS: any) => [...sS, { num: 2, title: 'Keys_sub_service', address: secondAddress }]);
      }
    }
  }, [secondAddress]);

  useEffect(() => {
    if (vacuumCleaner) {
      setSubService((sS: any) => [...sS, { title: 'Vacuum_cleaner_sub_service' }]);
    } else {
      setSubService((sS: any) => sS.filter((el: any) => el.title !== 'Vacuum_cleaner_sub_service'));
    }
  }, [vacuumCleaner]);

  useEffect(() => {
    const keysSubService = subServices.filter(el => el.title === 'Keys_sub_service');
    const vacuumCleanerSubService = subServices.filter(el => el.title === 'Vacuum_cleaner_sub_service');

    if (!keysSubService.length) {
      setKeys(false);
    }

    if (!vacuumCleanerSubService.length) {
      setVacuumCleaner(false);
    }
  }, [subServices]);

  return checkBoxes ? (
    <div className="check-boxes-block-component">
      {checkBoxes.includes('vacuum cleaner') ? (
        <CheckBox
          icon={vacuumCleanerSvg}
          title={'title-vacuum-cleaner-checkbox'}
          subTitle={'sub-text-vacuum-cleaner-checkbox'}
          price={'20 zl'}
          oldPrice={'30 zl'}
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
            oldPrice={'30 zl'}
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
                  placeholder="Address"
                />
              </div>
              {oneMoreAddress ? (
                <div className="input-wrapper">
                  <input
                    type="text"
                    value={secondAddress}
                    onChange={(e) => setSecondAddress(e.target.value)}
                    placeholder="Address"
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