import React, { useState } from "react";
import CaretDownIcon from "@/components/common/PhoneInput/icons/CaretDown";

import "./style.scss";
import { useClickOutside } from "@/hooks/useClickOutSide";
import { CITIES } from "@/components/OrderPage/constants";

export type City = {name: string, price: number}

interface CitiesProps {
  city: City
  setCity: (city: City) => void
  t: (text: string) => string
  callback: (bool: boolean) => void
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
      !searchValue || name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="city-wrapper _w-full city-relative" ref={dropdownRef}>
      {!isDropdownOpened && (
        <div className="city-input-wrapper" onClick={onDropdownOpen}>
          <div className="_w-full">{city.name}</div>
          <div className="px-2">
            <CaretDownIcon className="caret-icon" />
          </div>
        </div>
      )}
      {isDropdownOpened && (
        <>
          <input
            className="city-input-wrapper search-input"
            autoFocus
            value={searchValue}
            onChange={({ target: { value } }) => setSearchValue(value)}
          />
          <div className="_absolute _top-full _w-full menu _z-10 custom-scroll">
            {filteredCountries.length > 0 ? (
              filteredCountries.map(({ name, price }) => (
                <div
                  key={name}
                  className="_py-4 _px-3.5 _flex _items-center _cursor-pointer city-item"
                  onClick={() => onCitySelect({ name, price })}
                >
                  <span
                    className={`_mr-2 _whitespace-nowrap _overflow-hidden _text-ellipsis ${
                      city.name === name ? "_font-bold" : ""
                    }`}
                  >
                    {name}
                  </span>
                  {price > 0 && (
                    <div className="price-wrapper">
                      <div className="price">+{price} zl</div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="_py-4 _px-3.5 _flex _items-center _select-none">
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
