import React, { ReactNode, useState } from "react";
import { Polygon } from "@/components/Header/icons/Polygon";
import { useClickOutside } from "@/hooks/useClickOutSide";

interface DropdownProps {
  isBoldText?: boolean;
  translateOptions?: boolean;
  onSelect: (event: React.MouseEvent<HTMLDivElement>, option: string) => void;
  options: { value: string; icon?: ReactNode }[];
  t: (text: string) => string;
  value?: string;
  plainContent?: ReactNode;
}

function Dropdown({
  isBoldText,
  translateOptions,
  onSelect,
  options,
  t,
  value = '',
  plainContent,
}: DropdownProps) {
  const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false);
  const dropdownMenuRef = useClickOutside(() => setIsDropdownOpened(false));

  return (
    <div
      className="_flex _justify-between _items-center _relative _text-dark _cursor-pointer _group"
      onClick={(e) => {
        e.preventDefault();
        setIsDropdownOpened(true);
      }}
    >
      <div
        className={`_px-4 _py-2 _flex _gap-1 group-hover:_rounded-full
              group-hover:_outline group-hover:_outline-1 group-hover:_outline-primary-light`}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        {plainContent ? (
          plainContent
        ) : (
          <div
            className={`nav-link text-gradient ${isBoldText ? "_text-sm lg:_text-lg _font-semibold" : ""}`}
          >
            {t(value)}
          </div>
        )}
        <div className="_flex _items-center">
          <Polygon className="_text-primary-dark group-hover:_text-primary" />
        </div>
      </div>
      {isDropdownOpened ? (
        <div
          className="_z-50 _absolute _top-full _rounded-xl _border _border-solid _border-primary-light _bg-white"
          ref={dropdownMenuRef}
        >
          {options.map(({ icon, value }) => (
            <div
              className={`_py-2 _pr-6 _pl-4 hover:_bg-primary-background active:_bg-primary-background
                    first:_rounded-t-xl last:_rounded-b-xl last:_border-b-0
                    _border-b _border-solid _border-primary-light _flex _items-center _gap-2`}
              onClick={(e) => {
                onSelect(e, value);
                setIsDropdownOpened(false);
              }}
              key={value}
            >
              {Boolean(icon) && icon}
              <span
                className={`${isBoldText ? "_text-sm lg:_text-lg _font-semibold text-gradient" : ""}`}
              >
                {translateOptions ? t(value) : value}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Dropdown;
