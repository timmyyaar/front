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
      className="flex relative w-full"
      ref={dropdownRef}
    >
      {!isDropdownOpened && (
        <>
          <div
            className={`after:h-4/6 after:border-r after:border-gray-light
              after:absolute after:right-0 after:w-px after:content-['']
              cursor-pointer relative flex items-center bg-light py-3.5
              pl-3.5 pr-2 rounded-l-xl`}
            onClick={onDropdownOpen}
          >
            <div className="group font-semibold flex items-center">
              <div className="w-5 h-3.5">
                <Image
                  src={`/countries-flags/${phoneCountry.code}.svg`}
                  width="20"
                  height="15"
                  alt=""
                />
              </div>
              <span className="mx-1 whitespace-nowrap">
                +{phoneCountry.phoneCode}
              </span>
              <CaretDownIcon className="group-hover:text-primary" />
            </div>
          </div>
          <input
            type="text"
            className="rounded-e-xl py-3.5 pl-2 w-full bg-light outline-0 text-gray-dark"
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
            className="w-full bg-light outline-0 text-gray-dark p-3.5 rounded-t-xl"
            autoFocus
            value={searchValue}
            onChange={({ target: { value } }) => setSearchValue(value)}
          />
          <div
            className={`custom-scroll overflow-auto max-h-80 rounded-b-xl
              absolute top-full w-full shadow-md outline outline-1 outline-gray-light
              bg-light z-10`}
          >
            {filteredCountries.length > 0 ? (
              filteredCountries.map(({ name, code, phoneCode }) => (
                <div
                  key={code}
                  className={`py-4 px-3.5 flex items-center cursor-pointer
                    hover:opacity-70 active:opacity-100 active:text-primary
                    [&:not(:last-child)]:border-b border-gray-light`}
                  onClick={() => onCountrySelect({ name, code, phoneCode })}
                >
                  <Image
                    src={`/countries-flags/${code}.svg`}
                    width="20"
                    height="15"
                    alt=""
                  />
                  <span className="font-semibold ml-1 whitespace-nowrap">
                    +{phoneCode}
                  </span>
                  <span
                    className={`ml-2 whitespace-nowrap overflow-hidden text-ellipsis ${
                      code === phoneCountry.code ? "font-bold" : ""
                    }`}
                  >
                    {t(name)}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-4 px-3.5 flex items-center select-none">
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
