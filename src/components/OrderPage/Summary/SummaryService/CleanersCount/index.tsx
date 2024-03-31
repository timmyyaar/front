import Info from "@/components/OrderPage/Summary/SummaryService/icons/Info";
import Minus from "@/components/OrderPage/Summary/SummaryService/icons/Minus";
import Plus from "@/components/OrderPage/Summary/SummaryService/icons/Plus";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutSide";
import "./style.scss";

interface CleanersCountProps {
  cleanersCount: number;
  manualCleanersCount: number;
  setManualCleanersCount: Dispatch<SetStateAction<number>>;
  serviceTitle: string;
  t: (text: string) => string;
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

  return (
    <div className="_mt-2 cleaners-count-wrapper">
      <span className="_flex _items-center">
        <span
          onClick={() => setShowManualPopup(true)}
          className="original-cleaners"
        >
          {t("Cleaners")}: <b>{cleanersCount}</b>
          {manualCleanersCount > 0 && (
            <span className="cleaners-text difference _ml-1">
              (+{manualCleanersCount})
            </span>
          )}
        </span>
        <Info
          className="_ml-2"
          onClick={() => setIsCleanersInfoHovered(true)}
          onMouseEnter={() => setIsCleanersInfoHovered(true)}
          onMouseLeave={() => setIsCleanersInfoHovered(false)}
        />
      </span>
      {isCleanersInfoHovered && (
        <>
          <div className="mobile-none cleaners-count-popover info _flex _flex-col _gap-3 _rounded-2xl _p-3">
            {t("extra_cleaners_information")}
          </div>
          <div
            ref={cleanersInfoPopoverRef}
            className="mobile-only cleaners-count-popover info _flex _flex-col _gap-3 _rounded-2xl _p-3"
          >
            {t("extra_cleaners_information")}
          </div>
        </>
      )}
      {showManualPopup && (
        <div
          ref={cleanersPopoverRef}
          className="cleaners-count-popover _flex _flex-col _gap-3 _rounded-2xl _p-3"
        >
          <div className="_text-center cleaners-text">
            {t("extra_cleaners")}
          </div>
          <div className="_flex _items-center">
            <Minus
              className={`icon ${
                isMinusCleanersIconDisabled ? "disabled" : ""
              }`}
              onClick={() => {
                if (!isMinusCleanersIconDisabled) {
                  setManualCleanersCount(manualCleanersCount - 1);
                }
              }}
            />
            <span className="cleaners-count _mx-2">{manualCleanersCount}</span>
            <Plus
              className="icon"
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
