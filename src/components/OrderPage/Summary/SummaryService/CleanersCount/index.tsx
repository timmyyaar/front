import Info from "@/components/OrderPage/Summary/SummaryService/icons/Info";
import Minus from "@/components/OrderPage/Summary/SummaryService/icons/Minus";
import Plus from "@/components/OrderPage/Summary/SummaryService/icons/Plus";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutSide";

interface CleanersCountProps {
  cleanersCount: number;
  manualCleanersCount: number;
  setManualCleanersCount: Dispatch<SetStateAction<number>>;
  serviceTitle: string;
  t: (text: string, defaultText?: string) => string;
}

function CleanersCount({
  cleanersCount,
  manualCleanersCount,
  setManualCleanersCount,
  serviceTitle,
  t,
}: CleanersCountProps) {
  const [showManualPopup, setShowManualPopup] = useState<boolean>(false);
  const [isCleanersInfoHovered, setIsCleanersInfoHovered] =
    useState<boolean>(false);
  const cleanersPopoverRef = useClickOutside(() => setShowManualPopup(false));
  const cleanersInfoPopoverRef = useClickOutside(() =>
    setIsCleanersInfoHovered(false)
  );

  useEffect(() => {
    setManualCleanersCount(0);
  }, [serviceTitle]);

  const isMinusCleanersIconDisabled = manualCleanersCount === 0;

  const isDryCleaningOrOzonation = ["Dry cleaning", "Ozonation"].includes(
    serviceTitle
  );

  return (
    <div className="_mt-2">
      <span className="_flex _items-center">
        <span
          onClick={() => {
            if (!isDryCleaningOrOzonation) {
              setShowManualPopup(true);
            }
          }}
          className={`${
            !isDryCleaningOrOzonation ? "_cursor-pointer hover:_opacity-80" : ""
          }`}
        >
          {t("Cleaners")}: <b>{cleanersCount}</b>
          {manualCleanersCount > 0 && (
            <span className="_font-semibold _text-primary _ml-1">
              (+{manualCleanersCount})
            </span>
          )}
        </span>
        {!isDryCleaningOrOzonation && (
          <>
            <Info
              className="_ml-2 mobile-none"
              onClick={() => setIsCleanersInfoHovered(true)}
              onMouseEnter={() => setIsCleanersInfoHovered(true)}
              onMouseLeave={() => setIsCleanersInfoHovered(false)}
            />
            <Info
              className="_ml-2 mobile-only"
              onClick={() => setIsCleanersInfoHovered(true)}
            />
          </>
        )}
      </span>
      {isCleanersInfoHovered && (
        <>
          <div className="mobile-none _z-10 _absolute _bg-light _border _border-solid _border-primary _shadow-md max-w-[80%] _text-center _flex _flex-col _gap-3 _rounded-2xl _p-3">
            {t("extra_cleaners_information")}
          </div>
          <div
            ref={cleanersInfoPopoverRef}
            className="mobile-only _z-10 _absolute _bg-light _border _border-solid _border-primary _shadow-md max-w-[80%] _text-center _flex _flex-col _gap-3 _rounded-2xl _p-3"
          >
            {t("extra_cleaners_information")}
          </div>
        </>
      )}
      {showManualPopup && (
        <div
          ref={cleanersPopoverRef}
          className="_z-10 _absolute _bg-light _border _border-solid _border-primary _shadow-md _flex _flex-col _gap-3 _rounded-2xl _p-3"
        >
          <div className="_text-center _font-semibold">
            {t("extra_cleaners")}
          </div>
          <div className="_flex _items-center">
            <Minus
              className={`${
                isMinusCleanersIconDisabled
                  ? "_cursor-default _text-gray-lighter _pointer-events-none"
                  : "_cursor-pointer hover:_opacity-70 active:_text-primary"
              }`}
              onClick={() => {
                if (!isMinusCleanersIconDisabled) {
                  setManualCleanersCount(manualCleanersCount - 1);
                }
              }}
            />
            <span className="cleaners-count _text-xl _font-semibold _mx-2">
              {manualCleanersCount}
            </span>
            <Plus
              className="_cursor-pointer hover:_opacity-70 active:_text-primary"
              onClick={() => {
                setManualCleanersCount(manualCleanersCount + 1);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CleanersCount;
