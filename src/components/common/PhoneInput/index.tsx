import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

import "./style.scss";

import { useClickOutside } from "@/hooks/useClickOutSide";
import { COUNTRIES, Country } from "./constants";
import { POSITIVE_NUMBER_EMPTY_REGEX } from "@/constants";
import CaretDownIcon from "@/components/common/PhoneInput/icons/CaretDown";

interface PhoneInputProps {
  t: (text: string) => string;
  number: string;
  setNumber: Dispatch<SetStateAction<string>>;
  phoneCountry: Country;
  setPhoneCountry: Dispatch<SetStateAction<Country>>;
  isPhoneRelative?: boolean;
}

const PhoneInput = ({
  t,
  number,
  setNumber,
  phoneCountry,
  setPhoneCountry,
  isPhoneRelative,
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
      className={`phone-input-wrapper _w-full ${
        isPhoneRelative ? "phone-relative" : ""
      }`}
      ref={dropdownRef}
    >
      {!isDropdownOpened && (
        <>
          <div
            className="phone-dropdown _cursor-pointer _relative _flex _items-center"
            onClick={onDropdownOpen}
          >
            <div className="_font-semibold _flex _items-center">
              <div className="country-flag-image">
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
              <CaretDownIcon className="caret-icon" />
            </div>
          </div>
          <input
            type="text"
            className="phone-input"
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
            className="phone-input search-input"
            autoFocus
            value={searchValue}
            onChange={({ target: { value } }) => setSearchValue(value)}
          />
          <div className="_absolute _top-full _w-full menu _z-10">
            {filteredCountries.length > 0 ? (
              filteredCountries.map(({ name, code, phoneCode }) => (
                <div
                  key={code}
                  className="_py-4 _px-3.5 _flex _items-center _cursor-pointer country-item"
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
