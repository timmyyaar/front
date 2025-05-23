import React, { useContext } from "react";
import Image from "next/image";

import { Writer } from "@/components/common/Writer";

import {
  getSubServiceListByMainService,
  showSubServiceSquareMeters,
} from "./utils";
import { PricesContext, ServicesContext } from "@/components/Providers";
import { useSearchParams } from "next/navigation";
import { CITIES } from "@/constants";
import { getTransformedPrices } from "@/utils";
import { ISubService } from "@/types";

interface IProps {
  mainService: string;
  subServices: ISubService[];
  setSubService: (service: any) => void;
  priceMultiplier?: number;
  t: (text: string, defaultText?: string) => string;
}

export const SubServicesList = (props: IProps) => {
  const { prices } = useContext(PricesContext);
  const {
    mainServices: mainServicesResponse,
    subServices: subServicesResponse,
  } = useContext(ServicesContext);

  const searchParams = useSearchParams();
  const cityUrl = searchParams.get("city") || CITIES.KRAKOW.name;

  const transformedPrices = getTransformedPrices(prices, cityUrl);

  const {
    mainService,
    subServices,
    setSubService,
    priceMultiplier = 1,
    t,
  } = props;

  // TODO: We may need this code in future when we implement automatic price change on city change for all services.
  // useEffect(() => {
  //   const subServicesToReset = subServices.filter(({ disabledCities }) =>
  //     disabledCities.includes(cityUrl),
  //   );
  //
  //   if (subServicesToReset.length) {
  //     setSubService(
  //       subServices.filter(
  //         ({ id }) => !subServicesToReset.some((item) => item.id === id),
  //       ),
  //     );
  //   }
  // }, [cityUrl]);

  const addService = (service: ISubService) => {
    const isServiceExist = subServices.find(
      (subService) => subService.title === service.title,
    );

    if (!isServiceExist) {
      setSubService((oldSubServices: any) => [
        ...oldSubServices,
        { ...service, count: service.title === "Office cleaning" ? 60 : 1 },
      ]);
    }
  };

  const minusService = (e: any, service: ISubService) => {
    e.stopPropagation();

    const isSelectedServiceSingle =
      subServices.find((subService) => service.title === subService.title)
        ?.count === (service.title === "Office cleaning" ? 60 : 1);

    setSubService((prev: ISubService[]) =>
      isSelectedServiceSingle
        ? prev.filter(
            (selectedSubService) => selectedSubService.title !== service.title,
          )
        : prev.map((selectedSubService) =>
            selectedSubService.title === service.title
              ? {
                  ...selectedSubService,
                  count:
                    selectedSubService.count -
                    (service.title === "Office cleaning" ? 10 : 1),
                }
              : selectedSubService,
          ),
    );
  };

  const plusService = (e: any, service: ISubService) => {
    e.stopPropagation();

    setSubService((prev: ISubService[]) =>
      prev.map((prevService: ISubService) =>
        prevService.title === service.title
          ? {
              ...prevService,
              count:
                prevService.count +
                (service.title === "Office cleaning" ? 10 : 1),
            }
          : prevService,
      ),
    );
  };

  const getIsSubServiceSelected = (title: string) =>
    subServices.find((subService) => subService.title === title);

  const subServicesByMainService = getSubServiceListByMainService(
    transformedPrices,
    mainService,
    mainServicesResponse,
    subServicesResponse,
    priceMultiplier,
    cityUrl,
  );

  return subServicesByMainService.length ? (
    <div className="select-none">
      <div className="mb-4 text-center text-lg lg:text-2xl font-semibold">
        {t("Choose additional cleaning services")}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr">
        {subServicesByMainService.map((el: ISubService, i: number) => (
          <div
            className={`hover:shadow-custom-light-dark flex flex-col justify-between items-center py-5
              rounded-2xl bg-light border-solid border-4 border-light
              hover:bg-light-dark hover:border-light-dark ${
                getIsSubServiceSelected(el.title)
                  ? "outline outline-4 outline-primary"
                  : ""
              }`}
            onClick={() => addService(el)}
            key={JSON.stringify(el) + i}
          >
            <div className="text-center font-semibold">
              <Writer text={t(el.title)} whiteSpaceNormal />
            </div>
            <div className="w-full flex flex-col items-center px-4">
              {getIsSubServiceSelected(el.title) ? (
                <div className="w-full py-3.5">
                  <div className="min-h-12 flex justify-between items-center w-full select-none">
                    <div
                      className="cursor-pointer"
                      onClick={(e) => minusService(e, el)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                      >
                        <path
                          d="M25.875 15.375H10.125C9.42881 15.375 8.76113 15.6516 8.26884 16.1438C7.77656 16.6361 7.5 17.3038 7.5 18C7.5 18.6962 7.77656 19.3639 8.26884 19.8562C8.76113 20.3484 9.42881 20.625 10.125 20.625H25.875C26.5712 20.625 27.2389 20.3484 27.7312 19.8562C28.2234 19.3639 28.5 18.6962 28.5 18C28.5 17.3038 28.2234 16.6361 27.7312 16.1438C27.2389 15.6516 26.5712 15.375 25.875 15.375Z"
                          fill="#232323"
                        />
                      </svg>
                    </div>
                    <div className="text-center text-xl font-semibold">
                      {getIsSubServiceSelected(el.title)!.count}
                      {showSubServiceSquareMeters(el.title) ? (
                        <span className="ml-1">
                          m<sup>2</sup>
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={(e) => plusService(e, el)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                      >
                        <path
                          d="M25.8711 15.375H10.1211C9.4249 15.375 8.75722 15.6516 8.26494 16.1438C7.77266 16.6361 7.49609 17.3038 7.49609 18C7.49609 18.6962 7.77266 19.3639 8.26494 19.8562C8.75722 20.3484 9.4249 20.625 10.1211 20.625H25.8711C26.5673 20.625 27.235 20.3484 27.7273 19.8562C28.2195 19.3639 28.4961 18.6962 28.4961 18C28.4961 17.3038 28.2195 16.6361 27.7273 16.1438C27.235 15.6516 26.5673 15.375 25.8711 15.375Z"
                          fill="#232323"
                        />
                        <path
                          d="M15.3711 10.125L15.3711 25.875C15.3711 26.5712 15.6477 27.2389 16.1399 27.7312C16.6322 28.2234 17.2999 28.5 17.9961 28.5C18.6923 28.5 19.36 28.2234 19.8522 27.7312C20.3445 27.2389 20.6211 26.5712 20.6211 25.875L20.6211 10.125C20.6211 9.4288 20.3445 8.76112 19.8522 8.26884C19.36 7.77656 18.6923 7.5 17.9961 7.5C17.2999 7.5 16.6322 7.77656 16.1399 8.26884C15.6477 8.76112 15.3711 9.4288 15.3711 10.125Z"
                          fill="#232323"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-3.5 flex justify-center">
                  <Image
                    src={el.icons!}
                    alt=""
                    width="48"
                    height="48"
                    className="w-12 h-12"
                  />
                </div>
              )}
              <div
                className={`w-max flex justify-center items-center rounded-full
                  py-2 px-4 bg-warning text-lg lg:text-xl font-semibold`}
              >
                {el.price}
                {t("zl")}
                {el.title === "Ironing" || el.title === "Extra tasks"
                  ? t("/hour")
                  : null}
                {showSubServiceSquareMeters(el.title) ? (
                  <>
                    /m<sup>2</sup>
                  </>
                ) : null}
                {el.oldPrice && (
                  <div className="ml-2.5 text-gray text-sm font-semibold line-through">
                    {el.oldPrice}
                    {t("zl")}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};
