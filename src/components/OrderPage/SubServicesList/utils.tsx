import coffeeMachineSvg from '@/components/MainPage/AdditionalServices/icons/coffee-machine.svg';
import cleanClothesSvg from '@/components/MainPage/AdditionalServices/icons/clean-clothes.svg';
import closetSvg from '@/components/MainPage/AdditionalServices/icons/closet.svg';
import cookerHoodSvg from '@/components/MainPage/AdditionalServices/icons/cooker-hood.svg';
import fridgeSvg from '@/components/MainPage/AdditionalServices/icons/fridge.svg';
import hoursglassSvg from '@/components/MainPage/AdditionalServices/icons/hoursglass.svg';
import ironSvg from '@/components/MainPage/AdditionalServices/icons/iron.svg';
import kitchenSvg from '@/components/MainPage/AdditionalServices/icons/kitchen.svg';
import laundrySvg from '@/components/MainPage/AdditionalServices/icons/laundry.svg';
import microwaveSvg from '@/components/MainPage/AdditionalServices/icons/microwave.svg';
import ovenSvg from '@/components/MainPage/AdditionalServices/icons/oven.svg';
import petToiletTraySvg from '@/components/MainPage/AdditionalServices/icons/pet-toilet-tray.svg';
import SlowCooker from '@/components/MainPage/AdditionalServices/icons/slow-cooker.svg';
import wateringPlantsSvg from '@/components/MainPage/AdditionalServices/icons/watering-plants.svg';
import windowSvg from '@/components/MainPage/AdditionalServices/icons/window.svg';

import bathroomSvg from './icons/bathroom.svg';
import corredSvg from './icons/corred.svg';
import readingRoomSvg from './icons/reading-room.svg';
import iconsSvg from './icons/Icons.svg';
import balconySvg from './icons/balcony.svg';
import mirrorSvg from './icons/mirror.svg';
import hangerSvg from './icons/hanger.svg';

const allServices: ISubService[] = [
  { title: 'Clean the oven', icons: ovenSvg, price: '45 zl', oldPrice: '123zl' },
  { title: 'Clean the hood', icons: cookerHoodSvg, price: '45 zl', oldPrice: '' },
  { title: 'Clean the fridge', icons: fridgeSvg, price: '45 zl', oldPrice: '' },
  { title: 'Clean animal\'s tray', icons: petToiletTraySvg, price: '12 zl', oldPrice: '' },
  { title: 'Wash the microwave', icons: microwaveSvg, price: '12 zl', oldPrice: '' },
  { title: 'Clean kitchen \n cabinets', icons: kitchenSvg, price: '60 zl', oldPrice: '' },
  { title: 'Wash the window', icons: windowSvg, price: '30 zl',oldPrice: '' },
  { title: 'Space organizer', icons: cleanClothesSvg, price: '55 zl',oldPrice: '' },
  { title: 'Ironing',icons: ironSvg, price: '50 zl/hour',oldPrice: '' },
  { title: 'Wardrobe cleaning', icons: closetSvg, price: '45 zl',oldPrice: '' },
  { title: 'Clean the cloak room', icons: hangerSvg, price: '35 zl', oldPrice: '' },
  { title: 'Clean the mirror', icons: mirrorSvg, price: '12 zl', oldPrice: '' },
  { title: 'Balcony', icons: balconySvg, price: '25 zl', oldPrice: '' },
  { title: 'Water plants', icons: wateringPlantsSvg, price: '25 zl', oldPrice: '' },
  { title: 'Laundry', icons: laundrySvg, price: '20 zl', oldPrice: '' },
  { title: 'Cleaning bath or shower cubicle', icons: iconsSvg, price: '45 zl', oldPrice: '' },
  { title: 'Clean the room', icons: readingRoomSvg, price: '50 zl', oldPrice: '' },
  { title: 'Clean the corridor', icons: corredSvg, price: '20 zl', oldPrice: '' },
  { title: 'Clean the bathroom', icons: bathroomSvg, price: '60 zl', oldPrice: '' },
  { title: 'Extra tasks', icons: hoursglassSvg, price: '45 zl/hour', oldPrice: '' },
  { title: 'Clean slow-cooker', icons: SlowCooker, price: '12 zl', oldPrice: '' },
  { title: 'Clean coffee-machine', icons: coffeeMachineSvg, price: '12 zl', oldPrice: '' },
]

export interface ISubService {
  title: string;
  icons: string;
  price: string;
  oldPrice: string;
}

export const getSubServiceListByMainService = (mainService: string): ISubService[] | [] => {
  switch (mainService) {
    case 'After party':
    case 'In a last minute':
    case 'Window cleaning':
    case 'Airbnb':
    case 'Deep':
    case 'Regular':
    case 'Eco cleaning':
    case 'Move in/out':

      return [];

    case 'Custom cleaning':
      return allServices;

    default:
      return []
  }
}
