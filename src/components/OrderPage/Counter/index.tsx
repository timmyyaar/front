import React, { FC, Fragment, useEffect, useState } from 'react';

import { Switcher } from '@/components/common/Switcher';

import { Counter } from './components/Counter';
import { getCounterByMainService } from './utils';
import './style.scss';

interface IProps {
  mainService: string;
  setCounterValue: (value: []) => void;
  t: any;
}

export const CounterComponent: FC<IProps> = (props) => {
  const { mainService, setCounterValue, t } = props;
  const [counter, setCounter] = useState([]);
  const [select, setSelect] = useState([]);
  const [selectValue, setSelectValue] = useState('');

  const onChangeCounter = (count: number, i: number) => {
    if (count > 0) {
      // @ts-ignore
      setCounterValue((counts) => counts.map((el , j) => i === j ? { ...el, value: count } : el));
      setCounter((oldCounters) => {
        const newCounters = [...oldCounters];
        // @ts-ignore
        newCounters[i].count = count;

        return newCounters;
      });
    }
  }

  const onChangeSwitch = (newValue: string) => {
    // @ts-ignore
    setSelectValue(newValue);
    // @ts-ignore
    setCounterValue((oldMainCounter) => {
      // @ts-ignore
      return oldMainCounter.map(el => el.type !== 'counter' ? { value: newValue } : el);
    });
  }

  useEffect(() => {
    const counterConfig = getCounterByMainService(mainService);
    // @ts-ignore
    setCounter(counterConfig);
    // @ts-ignore
    setSelect(counterConfig.find(el => el.type === 'switcher')?.values ?? []);
    // @ts-ignore
    setSelectValue(counterConfig.find(el => el.type === 'switcher')?.values[0] ?? '');
    // @ts-ignore
    setCounterValue(counterConfig.length
      ? counterConfig.map((el, i) =>
          el.type === 'counter' ? ({
            type: el.type,
            title: mainService.replace(/ /g, '_').toLowerCase() + `_${i}_count_total`,
            value: el.count,
            param: el.value === 'm2',
          }) : ({
            value: el.count,
          })
        )
      : []
    );
  }, [mainService]);

  return counter.length ? (
    <div className="counter-component-wrapper">
      {counter.map((el: any, i) => (
        <Fragment key={JSON.stringify(el)}>
          {el.title ? (
            <div>
              <div className="title-wrapper">
                {el.title ? <div className="title">{t(el.title)}</div> : null}
                {el.cost ? (
                  <div className="cost-wrapper">
                    {el.cost.indexOf('m2') !== -1 ? <>{el.cost.replace('m2', '')}<>m<sup>2</sup></></> : el.cost}
                  </div>
                ): null}
              </div>
              {el.subtitle ? (
                <div className="sub-title-wrapper">
                  {t(el.subtitle)}
                </div>
              ) : null}
            </div>
          ) : null}
          {el.type === 'counter' ? (
            <>
              <Counter
                value={el.count}
                minValue={el?.minCount ?? 0}
                title={el.value!}
                onChange={(number) => onChangeCounter(number, i)}
                onMinus={() => onChangeCounter(el.count! - 1, i)}
                onPlus={() => onChangeCounter(el.count! + 1, i)}
                t={t}
              />
            </>
          ) : null}
          {el.type === 'switcher' ? (
            <div className="switcher-wrapper">
              <Switcher tab={selectValue} tabs={select} t={t} onClick={onChangeSwitch} />
            </div>
          ) : null}
        </Fragment>
      ))}
    </div>
  ) : null;
};
