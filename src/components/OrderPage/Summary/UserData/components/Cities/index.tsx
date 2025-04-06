import React, { useState } from "react";
import CaretDownIcon from "@/components/common/PhoneInput/icons/CaretDown";

import { useClickOutside } from "@/hooks/useClickOutSide";
import { CITIES } from "@/components/OrderPage/constants";

export type City = { name: string; price: number };

interface CitiesProps {
  city: City;
  setCity: (city: City) => void;
  t: (text: string) => string;
  callback: (bool: boolean) => void;
}

const Cities = ({ city, setCity, t, callback }: CitiesProps) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const dropdownRef = useClickOutside(() => {
    setIsDropdownOpened(false);
    callback(false);
    setSearchValue("");
  });

  const onDropdownOpen = () => {
    setIsDropdownOpened(true);
    callback(true);

    setSearchValue("");
  };

  const onCitySelect = (city: any) => {
    setCity(city);
    setIsDropdownOpened(false);
    callback(false);
  };

  const filteredCountries = CITIES.filter(
    ({ name }) =>
      !searchValue || name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className="relative flex w-full" ref={dropdownRef}>
      {!isDropdownOpened && (
        <div
          className={`group p-3.5 cursor-pointer w-full border border-solid
            border-gray rounded-xl flex items-center bg-light`}
          onClick={onDropdownOpen}
        >
          <div className="w-full">{t(city.name)}</div>
          <div className="px-2">
            <CaretDownIcon className="group-hover:text-primary" />
          </div>
        </div>
      )}
      {isDropdownOpened && (
        <>
          <input
            className={`p-3.5 cursor-pointer w-full border border-solid
              border-gray rounded-xl flex items-center bg-light outline-0 rounded-b-none`}
            autoFocus
            value={searchValue}
            onChange={({ target: { value } }) => setSearchValue(value)}
          />
          <div
            className={`custom-scroll absolute top-full w-full bg-light
              max-h-80 overflow-auto shadow-md border border-solid border-gray
              border-t-0 rounded-b-xl z-10`}
          >
            {filteredCountries.length > 0 ? (
              filteredCountries.map(({ name, price }) => (
                <div
                  key={name}
                  className={`py-4 px-3.5 flex items-center cursor-pointer
                    hover:opacity-70 [&:not(:last-child)]:border-b border-solid
                    border-gray-light`}
                  onClick={() => onCitySelect({ name, price })}
                >
                  <span
                    className={`mr-2 whitespace-nowrap overflow-hidden text-ellipsis ${
                      city.name === name ? "font-bold" : ""
                    }`}
                  >
                    {t(name)}
                  </span>
                  {price > 0 && (
                    <div className="py-1.5 px-2 bg-warning rounded-full font-semibold">
                      <div className="price">+{price} zl</div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-4 px-3.5 flex items-center select-none">
                {t("no_cities_message")}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cities;
