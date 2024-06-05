import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

import { useClickOutside } from "@/hooks/useClickOutSide";
import { COUNTRIES, Country } from "./constants";
import { POSITIVE_NUMBER_EMPTY_REGEX } from "@/constants";
import CaretDownIcon from "@/components/common/PhoneInput/icons/CaretDown";

interface PhoneInputProps {
  t: (text: string, defaultText?: string) => string;
  number: string;
  setNumber: Dispatch<SetStateAction<string>>;
  phoneCountry: Country;
  setPhoneCountry: Dispatch<SetStateAction<Country>>;
}

const PhoneInput = ({
  t,
  number,
  setNumber,
  phoneCountry,
  setPhoneCountry,
}: PhoneInputProps) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const dropdownRef = useClickOutside(() => {
    setIsDropdownOpened(false);
    setSearchValue("");
  });

  const onDropdownOpen = () => {
    setIsDropdownOpened(true);

    setSearchValue("");
  };

  const onCountrySelect = (country: Country) => {
    setPhoneCountry(country);
    setIsDropdownOpened(false);
  };

  const filteredCountries = COUNTRIES.filter(
    ({ name, code }) =>
      !searchValue ||
      t(name).toLowerCase().includes(searchValue.toLowerCase()) ||
      code.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div
      className="_flex _relative _w-full"
      ref={dropdownRef}
    >
      {!isDropdownOpened && (
        <>
          <div
            className={`after:_h-4/6 after:_border-r after:_border-gray-light
              after:_absolute after:_right-0 after:_w-px after:_content-['']
              _cursor-pointer _relative _flex _items-center _bg-light _py-3.5
              _pl-3.5 _pr-2 _rounded-l-xl`}
            onClick={onDropdownOpen}
          >
            <div className="_group _font-semibold _flex _items-center">
              <div className="_w-5 _h-3.5">
                <Image
                  src={`/countries-flags/${phoneCountry.code}.svg`}
                  width="20"
                  height="15"
                  alt=""
                />
              </div>
              <span className="_mx-1 _whitespace-nowrap">
                +{phoneCountry.phoneCode}
              </span>
              <CaretDownIcon className="group-hover:_text-primary" />
            </div>
          </div>
          <input
            type="text"
            className="_rounded-e-xl _py-3.5 _pl-2 _w-full _bg-light _outline-0 _text-gray-dark"
            placeholder={t("Contact number")}
            value={number}
            onChange={({ target: { value } }) => {
              if (POSITIVE_NUMBER_EMPTY_REGEX.test(value)) {
                setNumber(value.trim());
              }
            }}
          />
        </>
      )}
      {isDropdownOpened && (
        <>
          <input
            className="_w-full _bg-light _outline-0 _text-gray-dark _p-3.5 _rounded-t-xl"
            autoFocus
            value={searchValue}
            onChange={({ target: { value } }) => setSearchValue(value)}
          />
          <div
            className={`custom-scroll _overflow-auto _max-h-80 _rounded-b-xl
              _absolute _top-full _w-full _shadow-md _outline _outline-1 _outline-gray-light
              _bg-light _z-10`}
          >
            {filteredCountries.length > 0 ? (
              filteredCountries.map(({ name, code, phoneCode }) => (
                <div
                  key={code}
                  className={`_py-4 _px-3.5 _flex _items-center _cursor-pointer
                    hover:_opacity-70 active:_opacity-100 active:_text-primary
                    [&:not(:last-child)]:_border-b _border-gray-light`}
                  onClick={() => onCountrySelect({ name, code, phoneCode })}
                >
                  <Image
                    src={`/countries-flags/${code}.svg`}
                    width="20"
                    height="15"
                    alt=""
                  />
                  <span className="_font-semibold _ml-1 _whitespace-nowrap">
                    +{phoneCode}
                  </span>
                  <span
                    className={`_ml-2 _whitespace-nowrap _overflow-hidden _text-ellipsis ${
                      code === phoneCountry.code ? "_font-bold" : ""
                    }`}
                  >
                    {t(name)}
                  </span>
                </div>
              ))
            ) : (
              <div className="_py-4 _px-3.5 _flex _items-center _select-none">
                {t("No countries found...")}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PhoneInput;
