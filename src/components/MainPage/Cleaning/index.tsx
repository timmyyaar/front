"use client";
import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";

import { Switcher } from "@/components/common/Switcher";
import { Writer } from "@/components/common/Writer";

// Bath room images
import BathEngDeep from "./images/BathEngDeep.png";
import BathEngReg from "./images/BathEngReg.png";
import BathPolDeep from "./images/BathPolDeep.png";
import BathPolReg from "./images/BathPolReg.png";
import BathRusDeep from "./images/BathRusDeep.png";
import BathRusReg from "./images/BathRusReg.png";
import BathUkrDeep from "./images/BathUkrDeep.png";
import BathUkrReg from "./images/BathUkrReg.png";
// Bedroom room images
import BedroomEngDeep from "./images/BedroomEngDeep.png";
import BedroomEngReg from "./images/BedroomEngReg.png";
import BedroomPolDeep from "./images/BedroomPolDeep.png";
import BedroomPolReg from "./images/BedroomPolReg.png";
import BedroomRusDeep from "./images/BedroomRusDeep.png";
import BedroomRusReg from "./images/BedroomRusReg.png";
import BedroomUkrDeep from "./images/BedroomUkrDeep.png";
import BedroomUkrReg from "./images/BedroomUkrReg.png";
// Corridor room images
import CorridorEngDeep from "./images/CorridorEngDeep.png";
import CorridorEngReg from "./images/CorridorEngReg.png";
import CorridorPolDeep from "./images/CorridorPolDeep.png";
import CorridorPolReg from "./images/CorridorPolReg.png";
import CorridorRusDeep from "./images/CorridorRusDeep.png";
import CorridorRusReg from "./images/CorridorRusReg.png";
import CorridorUkrDeep from "./images/CorridorUkrDeep.png";
import CorridorUkrReg from "./images/CorridorUkrReg.png";
// Kitchen room images
import KitchenEngDeep from "./images/KitchenEngDeep.png";
import KitchenEngReg from "./images/KitchenEngReg.png";
import KitchenPolDeep from "./images/KitchenPolDeep.png";
import KitchenPolReg from "./images/KitchenPolReg.png";
import KitchenRusDeep from "./images/KitchenRusDeep.png";
import KitchenRusReg from "./images/KitchenRusReg.png";
import KitchenUkrDeep from "./images/KitchenUkrDeep.png";
import KitchenUkrReg from "./images/KitchenUkrReg.png";

import BalconyEngDeep from "./images/BalconyEngDeep.png";
import BalconyPolDeep from "./images/BalconyPolDeep.png";
import BalconyRusDeep from "./images/BalconyRusDeep.png";
import BalconyUkrDeep from "./images/BalconyUkrDeep.png";
import { HOW_IT_WORKS_TEXTS } from "@/components/MainPage/constants";

const roomsImages: {
  [key: string]: { [key: string]: { [key: string]: StaticImageData } };
} = {
  Bedroom: {
    Regular: {
      en: BedroomEngReg,
      pl: BedroomPolReg,
      ru: BedroomRusReg,
      ua: BedroomUkrReg,
    },
    Deep: {
      en: BedroomEngDeep,
      pl: BedroomPolDeep,
      ru: BedroomRusDeep,
      ua: BedroomUkrDeep,
    },
  },
  Kitchen: {
    Regular: {
      en: KitchenEngReg,
      pl: KitchenPolReg,
      ru: KitchenRusReg,
      ua: KitchenUkrReg,
    },
    Deep: {
      en: KitchenEngDeep,
      pl: KitchenPolDeep,
      ru: KitchenRusDeep,
      ua: KitchenUkrDeep,
    },
  },
  Corridor: {
    Regular: {
      en: CorridorEngReg,
      pl: CorridorPolReg,
      ru: CorridorRusReg,
      ua: CorridorUkrReg,
    },
    Deep: {
      en: CorridorEngDeep,
      pl: CorridorPolDeep,
      ru: CorridorRusDeep,
      ua: CorridorUkrDeep,
    },
  },
  Bathroom: {
    Regular: {
      en: BathEngReg,
      pl: BathPolReg,
      ru: BathRusReg,
      ua: BathUkrReg,
    },
    Deep: {
      en: BathEngDeep,
      pl: BathPolDeep,
      ru: BathRusDeep,
      ua: BathUkrDeep,
    },
  },
  Balcony: {
    Deep: {
      en: BalconyEngDeep,
      pl: BalconyPolDeep,
      ru: BalconyRusDeep,
      ua: BalconyUkrDeep,
    },
  },
};

const tabs = [{ label: "Regular" }, { label: "Deep" }];
const rooms: { [key: string]: string[] } = {
  Regular: ["Bedroom", "Kitchen", "Corridor", "Bathroom"],
  Deep: ["Bedroom", "Kitchen", "Corridor", "Bathroom", "Balcony"],
};

export const Cleaning = (props: any) => {
  const { t, lng } = props;

  const [tab, setTab] = useState<string>(tabs[0].label);
  const [room, setRoom] = useState<string>(rooms[tab][0]);
  const [roomImage, setRoomImage] = useState<any>(
    () => roomsImages.Bedroom.Regular[lng]
  );

  const [openRooms, setOpenedRooms] = useState<string[]>([]);

  useEffect(() => {
    if (room === "Balcony" && tab === "Regular") {
      setRoomImage(roomsImages.Bedroom.Regular[lng]);
    } else {
      setRoomImage(roomsImages[room]?.[tab]?.[lng]);
    }
  }, [room, tab, lng]);

  useEffect(() => {
    setOpenedRooms([]);
    if (tab === "Regular" && room === "Balcony") {
      setRoom("Bedroom");
    }
  }, [tab, room]);

  return (
    <div className="h-auto mb-14 lg:mb-0 px-5-percents lg:px-24 flex flex-col items-center">
      <div className="main-title mb-3 lg:mb-5 mobile-none">
        <span className="text-gradient">{t("What cleaning consists of")}</span>
      </div>
      <div className="main-title mb-3 lg:mb-5 mobile-only">
        <span className="text-gradient">
          {t("What_cleaning_consists_of_mobile")}
        </span>
      </div>
      <div className="flex justify-center mb-6 lg:mb-0">
        <Switcher
          tab={tab}
          tabs={tabs}
          t={t}
          onClick={(el: string) => setTab(el)}
        />
      </div>
      <div className="mobile-none w-full">
        <div
          className={`my-8 relative overflow-hidden flex justify-center ${room.toLowerCase()}`}
        >
          <Image
            src={roomImage}
            alt=""
            priority
            className="rounded-3xl h-full w-3/4"
          />
        </div>
        <div className="flex justify-around">
          {rooms[tab].map((el: any) => (
            <div
              className={`room-item w-52 h-16 flex items-center 
                justify-center font-medium cursor-pointer ${
                  el === room && "text-white bg-primary rounded-full"
                }`}
              onClick={() => setRoom(el as string)}
              key={el}
            >
              {t(el)}
            </div>
          ))}
        </div>
      </div>
      <div className="mobile-only p-5 w-full bg-light rounded-3xl">
        {rooms[tab].map((el: string, i: number) => (
          <div className="mb-3.5" key={JSON.stringify(el) + i}>
            <div
              className="mb-3 text-center"
              onClick={() =>
                setOpenedRooms((arr) =>
                  arr.includes(el)
                    ? arr.filter((room) => room !== el)
                    : [...arr, el]
                )
              }
            >
              <b className={`${openRooms.includes(el) ? "text-primary" : ""}`}>
                {t(el)}
              </b>
              {openRooms.includes(el) && (
                <div className="mt-3.5">
                  {/* @ts-ignore */}
                  {[...new Array(HOW_IT_WORKS_TEXTS[tab][el].length)].map(
                    (_, i) => (
                      <div
                        className="flex before:content-['\2022'] before:inline-block before:mr-3"
                        key={"text-mobile-room" + (i + 1)}
                      >
                        {/* @ts-ignore */}
                        <Writer
                          // @ts-ignore
                          text={t(HOW_IT_WORKS_TEXTS[tab][el][i])}
                          alignLeft
                        />
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="text-center text-sm text-gray-dark">
          {t("what_cleaning_consists_of_description")}
        </div>
      </div>
    </div>
  );
};
