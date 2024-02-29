"use client";
import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';

import { Switcher } from '@/components/common/Switcher';
import { Writer } from '@/components/common/Writer';

// Bath room images
import BathEngDeep from './images/BathEngDeep.png';
import BathEngReg from './images/BathEngReg.png';
import BathPolDeep from './images/BathPolDeep.png';
import BathPolReg from './images/BathPolReg.png';
import BathRusDeep from './images/BathRusDeep.png';
import BathRusReg from './images/BathRusReg.png';
import BathUkrDeep from './images/BathUkrDeep.png';
import BathUkrReg from './images/BathUkrReg.png';
// Bedroom room images
import BedroomEngDeep from './images/BedroomEngDeep.png';
import BedroomEngReg from './images/BedroomEngReg.png';
import BedroomPolDeep from './images/BedroomPolDeep.png';
import BedroomPolReg from './images/BedroomPolReg.png';
import BedroomRusDeep from './images/BedroomRusDeep.png';
import BedroomRusReg from './images/BedroomRusReg.png';
import BedroomUkrDeep from './images/BedroomUkrDeep.png';
import BedroomUkrReg from './images/BedroomUkrReg.png';
// Corridor room images
import CorridorEngDeep from './images/CorridorEngDeep.png';
import CorridorEngReg from './images/CorridorEngReg.png';
import CorridorPolDeep from './images/CorridorPolDeep.png';
import CorridorPolReg from './images/CorridorPolReg.png';
import CorridorRusDeep from './images/CorridorRusDeep.png';
import CorridorRusReg from './images/CorridorRusReg.png';
import CorridorUkrDeep from './images/CorridorUkrDeep.png';
import CorridorUkrReg from './images/CorridorUkrReg.png';
// Kitchen room images
import KitchenEngDeep from './images/KitchenEngDeep.png';
import KitchenEngReg from './images/KitchenEngReg.png';
import KitchenPolDeep from './images/KitchenPolDeep.png';
import KitchenPolReg from './images/KitchenPolReg.png';
import KitchenRusDeep from './images/KitchenRusDeep.png';
import KitchenRusReg from './images/KitchenRusReg.png';
import KitchenUkrDeep from './images/KitchenUkrDeep.png';
import KitchenUkrReg from './images/KitchenUkrReg.png';

import BalconyEngDeep from './images/BalconyEngDeep.png';
import BalconyPolDeep from './images/BalconyPolDeep.png';
import BalconyRusDeep from './images/BalconyRusDeep.png';
import BalconyUkrDeep from './images/BalconyUkrDeep.png';

import './style.scss';

const roomsImages = {
  Bedroom: {
    Regular: {
      en: BedroomEngReg,
      pl: BedroomPolReg,
      ru: BedroomRusReg,
      uk: BedroomUkrReg,
    },
    Deep: {
      en: BedroomEngDeep,
      pl: BedroomPolDeep,
      ru: BedroomRusDeep,
      uk: BedroomUkrDeep,
    }
  },
  Kitchen: {
    Regular: {
      en: KitchenEngReg,
      pl: KitchenPolReg,
      ru: KitchenRusReg,
      uk: KitchenUkrReg,
    },
    Deep: {
      en: KitchenEngDeep,
      pl: KitchenPolDeep,
      ru: KitchenRusDeep,
      uk: KitchenUkrDeep,
    }
  },
  Corridor: {
    Regular: {
      en: CorridorEngReg,
      pl: CorridorPolReg,
      ru: CorridorRusReg,
      uk: CorridorUkrReg,
    },
    Deep: {
      en: CorridorEngDeep,
      pl: CorridorPolDeep,
      ru: CorridorRusDeep,
      uk: CorridorUkrDeep,
    }
  },
  Bathroom: {
    Regular: {
      en: BathEngReg,
      pl: BathPolReg,
      ru: BathRusReg,
      uk: BathUkrReg,
    },
    Deep: {
      en: BathEngDeep,
      pl: BathPolDeep,
      ru: BathRusDeep,
      uk: BathUkrDeep,
    }
  },
  Balcony: {
    Deep: {
      en: BalconyEngDeep,
      pl: BalconyPolDeep,
      ru: BalconyRusDeep,
      uk: BalconyUkrDeep,
    }
  },
};

const roomsLines = {
  Bedroom: {
    Regular: 7,
    Deep: 9,
  },
  Kitchen: {
    Regular: 5,
    Deep: 8,
  },
  Corridor: {
    Regular: 5,
    Deep: 7,
  },
  Bathroom: {
    Regular: 5,
    Deep: 7,
  },
  Balcony: {
    Regular: 0,
    Deep: 3,
  },
};

export const Cleaning = (props: any) => {
  const { t, lng } = props;
  const tabs = ['Regular', 'Deep'];
  const rooms = {
    Regular: ['Bedroom', 'Kitchen', 'Corridor', 'Bathroom'],
    Deep: ['Bedroom', 'Kitchen', 'Corridor', 'Bathroom', 'Balcony']
  };

  const [tab, setTab] = useState(() => tabs[0]);
  // @ts-ignore
  const [room, setRoom] = useState(() => rooms[tab][0]);
  // @ts-ignore
  const [roomImage, setRoomImage] = useState(() => roomsImages.Bedroom.Regular[lng]);

  const [openRooms, setOpenedRooms] = useState([]);

  useEffect(() => {
    if (room === 'Balcony' && tab === 'Regular') {
      // @ts-ignore
      setRoomImage(roomsImages.Bedroom.Regular[lng]);
    }  else {
      // @ts-ignore
      setRoomImage(roomsImages[room]?.[tab]?.[lng]);
    }
  }, [room, tab, lng]);

  useEffect(() => {
    setOpenedRooms([]);
    if (tab === 'Regular' && room === 'Balcony') {
      setRoom('Bedroom');
    }
  }, [tab, room]);

  return (
    <div className="cleaning-component _flex _flex-col _items-center">
      <div className="main-title mobile-none">
        {t('What cleaning consists of')}
      </div>
      <div className="main-title-mobile mobile-only">
        {t('What_cleaning_consists_of_mobile')}
      </div>
      <div className="switcher-wrapper" style={{ width: '277px' }}>
        <Switcher tab={tab} tabs={tabs} t={t} onClick={(el: string) => setTab(el)} />
      </div>
      <div className="mobile-none">
        <div className={"room-img-wrapper" + " " + room.toLowerCase()}>
          <Image src={roomImage} alt="" priority />
        </div>
        <div className="_flex _justify-around">
          {/* @ts-ignore */}
          {rooms[tab].map((el: any) => (
            <div
              className={`room-item ${el === room && 'active'}`}
              onClick={() => setRoom(el as string)}
              key={el}
            >
              {t(el)}
            </div>
          ))}
        </div>
      </div>
      <div className="rooms-info-mobile">
         {/* @ts-ignore */}
        {rooms[tab].map((el: any, i: number) => (
          <div className="rooms-info-mobile-wrapper" key={JSON.stringify(el) + i}>
            {/* @ts-ignore */}
            <div className={`rooms-info-mobile-title ${openRooms.includes(el) ? ' active-rooms-info-mobile-title' : ''}`} onClick={() => setOpenedRooms((arr) => [...arr, el])}>
              <b>{t(el)}</b>
              {/* @ts-ignore */}
              {openRooms.includes(el) && (
                <div className="rooms-info-mobile-text-list">
                  {/* @ts-ignore */}
                  {[... new Array(roomsLines[el][tab])].map((_, i) => (
                    <div className="rooms-info-mobile-text-item" key={'text-mobile-room' + (i + 1)}>
                      <div className="rooms-info-mobile-text-item-text">
                        <Writer text={t('text-rooms-info-mobile-' + el + '_' + tab + '_' + (i + 1))} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};
