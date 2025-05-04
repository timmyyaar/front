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
    <div className="mt-2">
      <span className="flex items-center">
        <span
          onClick={() => {
            if (!isDryCleaningOrOzonation) {
              setShowManualPopup(true);
            }
          }}
          className={`${
            !isDryCleaningOrOzonation ? "cursor-pointer hover:opacity-80" : ""
          }`}
        >
          {t("Cleaners")}: <b>{cleanersCount}</b>
          {manualCleanersCount > 0 && (
            <span className="font-semibold text-primary ml-1">
              (+{manualCleanersCount})
            </span>
          )}
        </span>
        {!isDryCleaningOrOzonation && (
          <>
            <Info
              className="ml-2 mobile-none"
              onClick={() => setIsCleanersInfoHovered(true)}
              onMouseEnter={() => setIsCleanersInfoHovered(true)}
              onMouseLeave={() => setIsCleanersInfoHovered(false)}
            />
            <Info
              className="ml-2 mobile-only"
              onClick={() => setIsCleanersInfoHovered(true)}
            />
          </>
        )}
      </span>
      {isCleanersInfoHovered && (
        <>
          <div className="mobile-none z-10 absolute bg-light border border-solid border-primary shadow-md max-w-[80%] text-center flex flex-col gap-3 rounded-2xl p-3">
            {t("extra_cleaners_information")}
          </div>
          <div
            ref={cleanersInfoPopoverRef}
            className="mobile-only z-10 absolute bg-light border border-solid border-primary shadow-md max-w-[80%] text-center flex flex-col gap-3 rounded-2xl p-3"
          >
            {t("extra_cleaners_information")}
          </div>
        </>
      )}
      {showManualPopup && (
        <div
          ref={cleanersPopoverRef}
          className="z-10 absolute bg-light border border-solid border-primary shadow-md flex flex-col gap-3 rounded-2xl p-3"
        >
          <div className="text-center font-semibold">
            {t("extra_cleaners")}
          </div>
          <div className="flex items-center">
            <Minus
              className={`${
                isMinusCleanersIconDisabled
                  ? "cursor-default text-gray-lighter pointer-events-none"
                  : "cursor-pointer hover:opacity-70 active:text-primary"
              }`}
              onClick={() => {
                if (!isMinusCleanersIconDisabled) {
                  setManualCleanersCount(manualCleanersCount - 1);
                }
              }}
            />
            <span className="cleaners-count text-xl font-semibold mx-2">
              {manualCleanersCount}
            </span>
            <Plus
              className="cursor-pointer hover:opacity-70 active:text-primary"
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
