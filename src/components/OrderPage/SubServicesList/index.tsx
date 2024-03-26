import React, { FC, useEffect, useState } from "react";
import Image from "next/image";

import { Writer } from "@/components/common/Writer";

import { getSubServiceListByMainService, ISubService } from "./utils";
import "./style.scss";

interface IProps {
  mainService: string;
  subServices: ISubService[];
  setSubService: (service: any) => void;
  t: any;
}

export const SubServicesList: FC<IProps> = (props) => {
  const { mainService, subServices, setSubService, t } = props;
  const [selectedService, setSelectedService] = useState<string[]>([]);

  const addService = (service: ISubService) => {
    if (!selectedService.includes(service.title)) {
      setSelectedService((oldServices) => [...oldServices, service.title]);
      setSubService((oldSubServices: any) => [...oldSubServices, service]);
    }
  };

  const minusService = (e: any, service: ISubService) => {
    e.stopPropagation();
    // if (selectedService.filter((el) => el === service.title).length > 1) {
    setSelectedService((oldServices) => {
      const newServices = [...oldServices];
      const index = newServices.findIndex((el) => el === service.title);
      newServices.splice(index, 1);
      return newServices;
    });
    setSubService((oldSubServices: any) => {
      const newServices = [...oldSubServices];
      const index = newServices.findIndex(
        (el: any) => el.title === service.title
      );
      newServices.splice(index, 1);
      return newServices;
    });
    // }
  };

  const plusService = (e: any, service: ISubService) => {
    e.stopPropagation();
    setSelectedService((oldServices) => [...oldServices, service.title]);
    setSubService((oldSubServices: any) => [...oldSubServices, service]);
  };

  useEffect(() => {
    setSelectedService(subServices.map((el) => el.title));
  }, [subServices]);

  return getSubServiceListByMainService(mainService).length ? (
    <div className="sub-services-list-component">
      <div className="title">{t("Choose additional cleaning services")}</div>
      <div className="_grid _grid-cols-4">
        {getSubServiceListByMainService(mainService).map(
          (el: ISubService, i: number) => (
            <div
              // @ts-ignore
              className={`sub-services-item ${
                selectedService.includes(el.title)
                  ? "sub-services-item-active"
                  : ""
              }`}
              onClick={() => addService(el)}
              key={JSON.stringify(el) + i}
            >
              <div className="sub-services-title">
                <Writer text={t(el.title)} />
              </div>
              {/* @ts-ignore */}
              <div className="counter-and-price-wrapper">
                {selectedService.includes(el.title) ? (
                  <div className="counter-wrapper">
                    <div className="counter-sub-wrapper">
                      <div
                        className="_cursor-pointer"
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
                      <div className="count">
                        {
                          selectedService.filter(
                            (service) => service === el.title
                          ).length
                        }
                        {el.title === "Balcony" ? (
                          <span className="_ml-1">
                            m<sup>2</sup>
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        className="_cursor-pointer"
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
                  <div className="img-wrapper">
                    <Image
                      src={el.icons}
                      alt=""
                      width="48"
                      height="48"
                      className="image"
                    />
                  </div>
                )}
                <div className="price-wrapper">
                  {t(el.price)}
                  {t("zl")}
                  {el.title === "Ironing" || el.title === "Extra tasks"
                    ? t("/hour")
                    : null}
                  {el.title === "Balcony" ? (
                    <>
                      /m<sup>2</sup>
                    </>
                  ) : null}
                  {el.oldPrice && (
                    <div className="old-price">
                      {t(el.oldPrice)}
                      {t("zl")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  ) : null;
};
