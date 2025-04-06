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
      className="flex justify-between items-center relative text-dark cursor-pointer group"
      onClick={(e) => {
        e.preventDefault();
        setIsDropdownOpened(true);
      }}
    >
      <div
        className={`px-4 py-2 flex gap-1 group-hover:rounded-full
              group-hover:outline group-hover:outline-1 group-hover:outline-primary-light`}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        {plainContent ? (
          plainContent
        ) : (
          <div
            className={`nav-link text-gradient ${isBoldText ? "text-sm lg:text-lg font-semibold" : ""}`}
          >
            {t(value)}
          </div>
        )}
        <div className="flex items-center">
          <Polygon className="text-primary-dark group-hover:text-primary" />
        </div>
      </div>
      {isDropdownOpened ? (
        <div
          className="z-50 absolute top-full rounded-xl border border-solid border-primary-light bg-white"
          ref={dropdownMenuRef}
        >
          {options.map(({ icon, value }) => (
            <div
              className={`py-2 pr-6 pl-4 hover:bg-primary-background active:bg-primary-background
                    first:rounded-t-xl last:rounded-b-xl last:border-b-0
                    border-b border-solid border-primary-light flex items-center gap-2`}
              onClick={(e) => {
                onSelect(e, value);
                setIsDropdownOpened(false);
              }}
              key={value}
            >
              {Boolean(icon) && icon}
              <span
                className={`${isBoldText ? "text-sm lg:text-lg font-semibold text-gradient" : ""}`}
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
