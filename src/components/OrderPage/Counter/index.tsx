import React, {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { Switcher } from "@/components/common/Switcher";

import { Counter } from "./components/Counter";
import { getCounterByMainService, getIsPrivateHouse } from "./utils";
import "./style.scss";
import PrivateHouse from "@/components/OrderPage/PrivateHouse";

interface IProps {
  mainService: string;
  setCounterValue: (value: any) => void;
  t: any;
  isPrivateHouse?: boolean;
  setIsPrivateHouse?: Dispatch<SetStateAction<boolean>>;
}

export const CounterComponent: FC<IProps> = (props) => {
  const { mainService, setCounterValue, t, isPrivateHouse, setIsPrivateHouse } =
    props;
  const [counter, setCounter] = useState<any>([]);
  const [select, setSelect] = useState([]);
  const [selectValue, setSelectValue] = useState("");

  const onChangeCounter = (count: number, i: number) => {
    if (count > -1) {
      setCounterValue((counts: any) =>
        counts.map((el: any, j: number) =>
          i === j ? { ...el, value: count } : el
        )
      );
      setCounter((oldCounters: any) => {
        const newCounters = [...oldCounters];
        newCounters[i].count = count;

        return newCounters;
      });
    }
  };

  const onChangeSwitch = (newValue: string) => {
    setSelectValue(newValue);
    setCounterValue((oldMainCounter: any) => {
      return oldMainCounter.map((el: any) =>
        el.type !== "counter" ? { value: newValue } : el
      );
    });
  };

  useEffect(() => {
    const counterConfig = getCounterByMainService(mainService) as any;
    setCounter(counterConfig);
    setSelect(
      counterConfig.find((el: any) => el.type === "switcher")?.values ?? []
    );
    setSelectValue(
      counterConfig.find((el: any) => el.type === "switcher")?.values[0] ?? ""
    );
    setCounterValue(
      counterConfig.length
        ? counterConfig.map((el: any, i: any) =>
            el.type === "counter"
              ? {
                  type: el.type,
                  title:
                    mainService.replace(/ /g, "_").toLowerCase() +
                    `_${i}_count_total`,
                  value: el.count,
                  param: el.value === "m2",
                }
              : {
                  value: el.count,
                }
          )
        : []
    );
  }, [mainService]);

  const showIsPrivateHouse = getIsPrivateHouse(mainService);

  return counter.length ? (
    <div className="counter-component-wrapper">
      {counter.map((el: any, i: number) => (
        <Fragment key={i}>
          {el.title ? (
            <div>
              <div className="title-wrapper">
                {el.title ? <div className="title">{t(el.title)}</div> : null}
                {el.cost ? (
                  <div className="cost-wrapper">
                    {el.cost.indexOf("m2") !== -1 ? (
                      <>
                        {el.cost.replace("m2", "")}
                        <>
                          m<sup>2</sup>
                        </>
                      </>
                    ) : (
                      el.cost
                    )}
                  </div>
                ) : null}
              </div>
              {el.subtitle ? (
                <div className="sub-title-wrapper">{t(el.subtitle)}</div>
              ) : null}
            </div>
          ) : null}
          {el.type === "counter" ? (
            <>
              <Counter
                value={el.count}
                minValue={el?.minCount ?? 0}
                title={el.value!}
                onChange={(number) => onChangeCounter(number, i)}
                onMinus={() => onChangeCounter(+el.count! - 1, i)}
                onPlus={() => onChangeCounter(+el.count! + 1, i)}
                t={t}
              />
            </>
          ) : null}
          {el.type === "switcher" ? (
            <div className="switcher-wrapper">
              <Switcher
                tab={selectValue}
                tabs={select}
                t={t}
                onClick={onChangeSwitch}
              />
            </div>
          ) : null}
        </Fragment>
      ))}
      {showIsPrivateHouse && (
        <PrivateHouse
          t={t}
          isPrivateHouse={isPrivateHouse}
          setIsPrivateHouse={setIsPrivateHouse}
        />
      )}
    </div>
  ) : null;
};
