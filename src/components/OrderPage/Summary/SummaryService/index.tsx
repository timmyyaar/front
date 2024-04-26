import React, { Dispatch, SetStateAction } from "react";
import {
  ISubService,
  SelectedSubService,
  showSubServiceSquareMeters,
} from "@/components/OrderPage/SubServicesList/utils";
import { IconCrosse } from "@/components/OrderPage/Summary/icons/IconCrosse";

import CleanersCount from "@/components/OrderPage/Summary/SummaryService/CleanersCount";

interface SummaryServiceProps {
  serviceTitle: string;
  counterValue: {
    type: string;
    title: string;
    value: string;
    param: boolean;
  }[];
  subServiceList: ISubService[];
  cleanersCount: number;
  onRemoveSubService: (title: string, isSecond?: boolean) => void;
  manualCleanersCount: number;
  setManualCleanersCount: Dispatch<SetStateAction<number>>;
  t: (text: string) => string;
  isSecond?: boolean;
}

function SummaryService({
  serviceTitle,
  counterValue,
  subServiceList,
  cleanersCount,
  onRemoveSubService,
  manualCleanersCount,
  setManualCleanersCount,
  t,
  isSecond = false,
}: SummaryServiceProps) {
  return (
    <>
      <div className="summary-title">{t(serviceTitle + "_summary_title")}</div>
      {counterValue?.length > 0 && (
        <div className="summary-counter">
          {counterValue.map((el: any, i: number, arr: any[]) =>
            el.type === "counter" ? (
              <div key={el.title + el.value + i}>
                {t(el.title)}
                <b>
                  {el.value}
                  {el.param ? (
                    <>
                      {t("m")}
                      <sup>2</sup>
                    </>
                  ) : (
                    ""
                  )}
                </b>
                <b>{i + 1 === arr.length ? "" : ";"}</b>
              </div>
            ) : (
              <div key={el.title + el.value + i}>{t(el.value)}</div>
            )
          )}
        </div>
      )}
      <CleanersCount
        cleanersCount={cleanersCount}
        manualCleanersCount={manualCleanersCount}
        setManualCleanersCount={setManualCleanersCount}
        serviceTitle={serviceTitle}
        t={t}
      />
      {subServiceList.length ? (
        <div className="services-in-summary">
          <div className="title-sub-service-title">{t("Add services")}</div>
          {subServiceList.map((subService: SelectedSubService, i: number) => (
            <div
              className="service-item _flex _items-center"
              key={subService.title + i}
            >
              <div>
                {t(subService.title + "_summery")} ({subService.count}
                {showSubServiceSquareMeters(subService.title) && (
                  <>
                    {t("m")}
                    <sup>2</sup>
                  </>
                )}
                )
              </div>
              <div
                className="icon-wrapper _cursor-pointer"
                onClick={() => onRemoveSubService(subService.title, isSecond)}
              >
                <IconCrosse />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default SummaryService;
