"use client";

import React, {
  FC,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

import CheckBox from "./components/Checkbox";

import checkListPng from "./icons/check-list.png";
import {
  ALL_SERVICE,
  ALL_SUB_SERVICES,
} from "@/components/OrderPage/constants";
import { PricesContext, ServicesContext } from "@/components/Providers";
import { useSearchParams } from "next/navigation";
import { CITIES } from "@/constants";
import { getTransformedPrices } from "@/utils";
import { SubService } from "@/types";

interface IProps {
  mainService: string;
  subServices: any[];
  setSubService: (service: any) => void;
  priceMultiplier?: number;
  t: any;
  ownCheckList: boolean;
  setOwnCheckList: Dispatch<SetStateAction<boolean>>;
}

export const CheckBoxesBlock: FC<IProps> = (props) => {
  const { prices } = useContext(PricesContext);
  const {
    mainServices: mainServicesResponse,
    subServices: subServicesResponse,
  } = useContext(ServicesContext);

  const searchParams = useSearchParams();
  const city = searchParams.get("city") || CITIES.KRAKOW.name;

  const transformedPrices = getTransformedPrices(prices, city);

  const {
    mainService,
    subServices,
    setSubService,
    t,
    priceMultiplier = 1,
    ownCheckList,
    setOwnCheckList,
  } = props;

  const standaloneSubServices = subServicesResponse.filter(
    ({ mainServices, isStandalone }) => {
      const selectedMainService = mainServicesResponse.find(
        ({ title }) => title === mainService,
      );

      return mainServices.includes(selectedMainService!.id) && isStandalone;
    },
  );

  useEffect(() => {
    setOwnCheckList(false);
  }, [mainService]);

  const onStandaloneServiceCheck = (
    subService: SubService & {
      oldPrice: string | number;
      originalPrice: number;
      price: number;
    },
  ) => {
    if (subServices.some((item) => item.id === subService.id)) {
      setSubService((prev: any) =>
        prev.filter((el: any) => el.id !== subService.id),
      );
    } else {
      setSubService((prev: any) => [
        ...prev,
        {
          ...subService,
          count: 1,
        },
      ]);
    }
  };

  const isOffice = mainService === ALL_SERVICE.OFFICE;
  const showCheckboxes = standaloneSubServices.length > 0 || isOffice;

  return showCheckboxes ? (
    <div className="_gap-10 lg:_gap-20 _flex _flex-col">
      {standaloneSubServices.map((subService) => {
        const originalPrice = transformedPrices[subService.key];
        const price =
          transformedPrices[subService.key] *
          (subService.isDiscountExcluded ? 1 : priceMultiplier);
        const oldPrice =
          subService.isDiscountExcluded || priceMultiplier === 1
            ? ""
            : originalPrice;

        return (
          <CheckBox
            key={subService.key}
            icon={
              ALL_SUB_SERVICES.find((item) => item.title === subService.title)!
                .icons
            }
            title={`${subService.key}Title`}
            subTitle={`${subService.key}SubTitle`}
            price={`${price} zl`}
            oldPrice={oldPrice ? `${oldPrice} zl` : ""}
            setCheck={() =>
              onStandaloneServiceCheck({
                ...subService,
                originalPrice,
                price,
                oldPrice,
              })
            }
            checked={subServices.some(({ id }) => id === subService.id)}
            t={t}
          />
        );
      })}
      {isOffice ? (
        <CheckBox
          icon={checkListPng}
          title={"we_provide_our_own_check_list"}
          setCheck={setOwnCheckList}
          checked={ownCheckList}
          t={t}
        />
      ) : null}
    </div>
  ) : null;
};
