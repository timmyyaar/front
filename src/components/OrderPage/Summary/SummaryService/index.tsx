import React, { Dispatch, SetStateAction } from "react";
import { showSubServiceSquareMeters } from "@/components/OrderPage/SubServicesList/utils";
import { IconCrosse } from "@/components/OrderPage/Summary/icons/IconCrosse";

import CleanersCount from "@/components/OrderPage/Summary/SummaryService/CleanersCount";
import { ISubService } from "@/types";

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
  t: (text: string, defaultText?: string) => string;
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
      <div className="_text-2xl _font-semibold">
        {t(serviceTitle + "_summary_title")}
      </div>
      {counterValue?.length > 0 && (
        <div className="_flex _gap-3 _overflow-hidden _mt-2">
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
            ),
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
        <div>
          <div className="_my-2 _text-lg _font-semibold">
            {t("Add services")}
          </div>
          {subServiceList.map((subService: ISubService, i: number) => (
            <div
              className={`_mr-2 _mb-2 _float-left _h-full _w-max _pl-3 _pr-1.5
                _flex _items-center _rounded-full _max-w-full _border _border-solid _border-gray`}
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
                className="_ml-1 _cursor-pointer"
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
