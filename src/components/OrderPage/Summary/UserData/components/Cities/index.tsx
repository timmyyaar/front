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
      !searchValue || name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="city-wrapper _relative _flex _w-full" ref={dropdownRef}>
      {!isDropdownOpened && (
        <div
          className={`_group _p-3.5 _cursor-pointer _w-full _border _border-solid
            _border-gray _rounded-xl _flex _items-center _bg-light`}
          onClick={onDropdownOpen}
        >
          <div className="_w-full">{city.name}</div>
          <div className="px-2">
            <CaretDownIcon className="group-hover:_text-primary" />
          </div>
        </div>
      )}
      {isDropdownOpened && (
        <>
          <input
            className={`_p-3.5 _cursor-pointer _w-full _border _border-solid
              _border-gray _rounded-xl _flex _items-center _bg-light _outline-0
              _p-3.5 _rounded-b-none`}
            autoFocus
            value={searchValue}
            onChange={({ target: { value } }) => setSearchValue(value)}
          />
          <div
            className={`custom-scroll _absolute _top-full _w-full _bg-light
              _max-h-80 _overflow-auto _shadow-md _border _border-solid _border-gray
              _border-t-0 _rounded-b-xl _z-10`}
          >
            {filteredCountries.length > 0 ? (
              filteredCountries.map(({ name, price }) => (
                <div
                  key={name}
                  className={`_py-4 _px-3.5 _flex _items-center _cursor-pointer
                    hover:_opacity-70 [&:not(:last-child)]:_border-b _border-solid
                    _border-gray-light`}
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
                    <div className="_py-1.5 _px-2 _bg-warning _rounded-full _font-semibold">
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
