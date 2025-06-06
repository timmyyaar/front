import React, { FC } from "react";

interface Props {
  icons?: any[];
  tab: string;
  tabs: { label: string; isDisabled?: boolean }[];
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
    className={`border-solid border-2 border-primary z-0 relative w-full rounded-full
      min-w-72 h-12 lg:h-16 grid grid-cols-2 justify-around`}
  >
    {tabs.map((el: { label: string; isDisabled?: boolean }, i) => (
      <div
        className={`flex items-center justify-center text-sm lg:text-base h-full z-20 text-center
          font-medium whitespace-nowrap w-full px-4 ${
            el.isDisabled
              ? "opacity-40 cursor-not-allowed"
              : "cursor-pointer hover:text-primary-dark active:text-primary-dark"
          }`}
        onClick={() => {
          if (el.isDisabled) {
            return;
          }

          onClick(el.label);
        }}
        key={el.label}
      >
        <span
          className={
            el.label === tab ? "transition-all duration-500 text-white" : ""
          }
        >
          <div className="flex items-center gap-2">
            {icons?.length ? <div>{icons[i]}</div> : null}
            <b>{t(el.label)}</b>
          </div>
        </span>
      </div>
    ))}
    <div
      className={`transition-all duration-300 rounded-full w-1/2
        z-10 absolute bg-primary h-full ${
          tabs.findIndex((el) => el.label === tab) === 0
            ? "-left-px"
            : "left-1/2"
        }`}
    />
  </div>
);
