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
      ? counterConfig.map(el => el.type === 'counter' ? ({
        type: el.type,
        title: mainService.replace(/ /g, '_').toLowerCase() + '_count_total',
        value: el.count,
        param: el.value === 'm2',
      }) : ({
        value: el.count,
      }))
      : []
    );
  }, [mainService]);

  return counter.length ? (
    <div className="counter-component-wrapper">
      {counter.map((el, i) => (
        <Fragment key={JSON.stringify(el)}>
          {/* @ts-ignore */}
          {el.title ? (
            <div>
              <div className="title-wrapper">
                {/* @ts-ignore */}
                {el.title ? <div className="title">{el.title}</div> : null}
                {/* @ts-ignore */}
                {el.cost ? <div className="cost-wrapper">{el.cost}</div> : null}
                {/* @ts-ignore */}
              </div>
              {/* @ts-ignore */}
              {el.subtitle ? (
                <div className="sub-title-wrapper">
                  {/* @ts-ignore */}
                  {el.subtitle}
                </div>
              ) : null}
            </div>
          ) : null}
          {/* @ts-ignore */}
          {el.type === 'counter' ? (
            <>
              <Counter
                // @ts-ignore
                value={el.count}
                // @ts-ignore
                minValue={el?.minCount ?? 0}
                // @ts-ignore
                title={el.value!}
                // @ts-ignore
                onMinus={() => onChangeCounter(el.count! - 1, i)}
                // @ts-ignore
                onPlus={() => onChangeCounter(el.count! + 1, i)}
                t={t}
              />
            </>
          ) : null}
          {/* @ts-ignore */}
          {el.type === 'switcher' ? (
            <div className="switcher-wrapper">
              {/* @ts-ignore */}
              <Switcher tab={selectValue} tabs={select} t={t} onClick={onChangeSwitch} />
            </div>
          ) : null}
        </Fragment>
      ))}
    </div>
  ) : null;
};
