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
      <div className="text-2xl font-semibold">
        {t(serviceTitle + "_summary_title")}
      </div>
      {counterValue?.length > 0 && (
        <div className="flex gap-3 overflow-hidden mt-2">
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
          <div className="my-2 text-lg font-semibold">
            {t("Add services")}
          </div>
          {subServiceList.map((subService: ISubService, i: number) => (
            <div
              className="mr-2 mb-2 float-left h-full w-max pl-3 pr-1.5
                flex items-center rounded-full max-w-full border border-solid border-gray"
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
                className="ml-1 cursor-pointer"
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
