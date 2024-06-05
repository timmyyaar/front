import React, { FC } from "react";

interface Props {
  icons?: any[];
  tab: string;
  tabs: string[];
  onClick: (el: string) => void;
  t?: any;
}

export const Switcher: FC<Props> = ({
  icons = [],
  tabs,
  tab,
  onClick,
  t = (str: string) => str,
}) => (
  <div
    className={`_border-solid _border-2 _border-primary _z-0 _relative _w-full _rounded-full
      _min-w-72 _h-12 lg:_h-16 _grid _grid-cols-2 _justify-around`}
  >
    {tabs.map((el: string, i) => (
      <div
        className={`_flex _items-center _justify-center hover:_text-primary-dark
          active:_text-primary-dark _text-sm lg:_text-base _h-full _z-20 _text-center
          _font-medium _whitespace-nowrap __w-full _px-4 _cursor-pointer`}
        onClick={() => onClick(el)}
        key={el}
      >
        <span
          className={
            el === tab ? "_transition-all _duration-500 _text-white" : ""
          }
        >
          <div className="_flex _items-center _gap-2">
            {icons?.length ? <div>{icons[i]}</div> : null}
            <b>{t(el)}</b>
          </div>
        </span>
      </div>
    ))}
    <div
      className={`_transition-all _duration-300 _rounded-full _w-1/2
        _z-10 _absolute _bg-primary _h-full ${
          tabs.indexOf(tab) === 0 ? "_-left-px" : "_left-1/2"
        }`}
    />
  </div>
);
