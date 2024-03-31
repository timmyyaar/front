import { ISubService } from "@/components/OrderPage/SubServicesList/utils";
import { IconCrosse } from "@/components/OrderPage/Summary/icons/IconCrosse";
import React, { Dispatch, SetStateAction } from "react";
import { getSubServices } from "@/components/OrderPage/Summary/utils";

import CleanersCount from "@/components/OrderPage/Summary/SummaryService/CleanersCount";

interface SummaryServiceProps {
  serviceTitle: string;
  counterValue: {
    type: string;
    title: string;
    value: string;
    param: boolean;
  }[];
  sec?: boolean;
  subServiceList: ISubService[];
  cleanersCount: number;
  onRemoveSubService: (title: string, sec: boolean) => void;
  manualCleanersCount: number;
  setManualCleanersCount: Dispatch<SetStateAction<number>>;
  t: (text: string) => string;
}

function SummaryService({
  serviceTitle,
  counterValue,
  subServiceList,
  sec = false,
  cleanersCount,
  onRemoveSubService,
  manualCleanersCount,
  setManualCleanersCount,
  t,
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
      {getSubServices(subServiceList).length ? (
        <div className="services-in-summary">
          <div className="title-sub-service-title">{t("Add services")}</div>
          {getSubServices(subServiceList).map((title: string, i: number) => (
            <div className="service-item _flex _items-center" key={title + i}>
              <div>
                {t(title + "_summery")} (
                {
                  subServiceList.filter((el: ISubService) => el.title === title)
                    .length
                }
                {title === "Balcony" && (
                  <>
                    {t("m")}
                    <sup>2</sup>
                  </>
                )}
                )
              </div>
              <div
                className="icon-wrapper _cursor-pointer"
                onClick={() => onRemoveSubService(title, sec)}
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
