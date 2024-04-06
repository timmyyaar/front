import coffeeMachineSvg from "@/components/MainPage/AdditionalServices/icons/coffee-machine.svg";
import cleanClothesSvg from "@/components/MainPage/AdditionalServices/icons/clean-clothes.svg";
import cleanDishesSvg from "@/components/MainPage/AdditionalServices/icons/clean-dishes.svg";
import closetSvg from "@/components/MainPage/AdditionalServices/icons/closet.svg";
import cookerHoodSvg from "@/components/MainPage/AdditionalServices/icons/cooker-hood.svg";
import fridgeSvg from "@/components/MainPage/AdditionalServices/icons/fridge.svg";
import hoursglassSvg from "@/components/MainPage/AdditionalServices/icons/hoursglass.svg";
import ironSvg from "@/components/MainPage/AdditionalServices/icons/iron.svg";
import kitchenSvg from "@/components/MainPage/AdditionalServices/icons/kitchen.svg";
import kitchenCabinets from "@/components/MainPage/AdditionalServices/icons/kitchen-cabinets.svg";
import laundrySvg from "@/components/MainPage/AdditionalServices/icons/laundry.svg";
import microwaveSvg from "@/components/MainPage/AdditionalServices/icons/microwave.svg";
import ovenSvg from "@/components/MainPage/AdditionalServices/icons/oven.svg";
import petToiletTraySvg from "@/components/MainPage/AdditionalServices/icons/pet-toilet-tray.svg";
import SlowCooker from "@/components/MainPage/AdditionalServices/icons/slow-cooker.svg";
import wateringPlantsSvg from "@/components/MainPage/AdditionalServices/icons/watering-plants.svg";
import windowSvg from "@/components/MainPage/AdditionalServices/icons/window.svg";
import { CounterCoasts } from "@/constants";

import babyStrollerSvg from "./icons/baby-stroller.svg";
import bathroomSvg from "./icons/bathroom.svg";
import corredSvg from "./icons/corred.svg";
import bedSvg from "./icons/bed.svg";
import chairSvg from "./icons/chair.svg";
import readingRoomSvg from "./icons/reading-room.svg";
import iconsSvg from "./icons/Icons.svg";
import balconySvg from "./icons/balcony.svg";
import mattressSvg from "./icons/mattress.svg";
import mattressDblSvg from "./icons/mattressDbl.svg";
import mirrorSvg from "./icons/mirror.svg";
import officeChairSvg from "./icons/office-chair.svg";
import hangerSvg from "./icons/hanger.svg";
import sofaSvg from "./icons/sofa.svg";
import twoSeaterSofaSvg from "./icons/two-seater-sofa.svg";
import threeSeaterSofaSvg from "./icons/three-seater-sofa.svg";
import fourSeaterSofaSvg from "./icons/four-seater-sofa.svg";
import fiveSeaterSofaSvg from "./icons/five-seater-sofa.svg";
import sixSeaterSofaSvg from "./icons/six-seater-sofa.svg";
import carpetSvg from "./icons/carpet.svg";

const allServices: ISubService[] = [
  {
    title: "Clean the room",
    icons: readingRoomSvg,
    price: CounterCoasts["Clean the room"].price,
    oldPrice: CounterCoasts["Clean the room"].old,
    time: 30,
  },
  {
    title: "Clean the bathroom",
    icons: bathroomSvg,
    price: CounterCoasts["Clean the bathroom"].price,
    oldPrice: CounterCoasts["Clean the bathroom"].old,
    time: 45,
  },
  {
    title: "Clean the kitchen",
    icons: kitchenSvg,
    price: CounterCoasts["Clean the kitchen"].price,
    oldPrice: CounterCoasts["Clean the kitchen"].old,
    time: 60,
  },
  {
    title: "Clean the corridor",
    icons: corredSvg,
    price: CounterCoasts["Clean the corridor"].price,
    oldPrice: CounterCoasts["Clean the corridor"].old,
    time: 30,
  },
  {
    title: "Clean the cloak room",
    icons: hangerSvg,
    price: CounterCoasts["Clean the cloak room"].price,
    oldPrice: CounterCoasts["Clean the cloak room"].old,
    time: 30,
  },
  {
    title: "Wash the window",
    icons: windowSvg,
    price: CounterCoasts["Wash the window"].price,
    oldPrice: CounterCoasts["Wash the window"].old,
    time: 30,
  },
  {
    title: "Balcony",
    icons: balconySvg,
    price: CounterCoasts.Balcony.price,
    oldPrice: CounterCoasts.Balcony.old,
    time: 1,
  },
  {
    title: "Clean the oven",
    icons: ovenSvg,
    price: CounterCoasts["Clean the oven"].price,
    oldPrice: CounterCoasts["Clean the oven"].old,
    time: 45,
  },
  {
    title: "Clean the fridge",
    icons: fridgeSvg,
    price: CounterCoasts["Clean the fridge"].price,
    oldPrice: CounterCoasts["Clean the fridge"].old,
    time: 60,
  },
  {
    title: "Clean kitchen cabinets",
    icons: kitchenCabinets,
    price: CounterCoasts["Clean kitchen cabinets"].price,
    oldPrice: CounterCoasts["Clean kitchen cabinets"].old,
    time: 60,
  },
  {
    title: "Clean the hood",
    icons: cookerHoodSvg,
    price: CounterCoasts["Clean the hood"].price,
    oldPrice: CounterCoasts["Clean the oven"].old,
    time: 45,
  },
  {
    title: "Extra tasks",
    icons: hoursglassSvg,
    price: CounterCoasts["Extra tasks"].price,
    oldPrice: CounterCoasts["Extra tasks"].old,
    time: 60,
  },
  {
    title: "Cleaning bath or shower cubicle",
    icons: iconsSvg,
    price: CounterCoasts["Cleaning bath or shower cubicle"].price,
    oldPrice: CounterCoasts["Cleaning bath or shower cubicle"].old,
    time: 30,
  },
  {
    title: "Ironing",
    icons: ironSvg,
    price: CounterCoasts.Ironing.price,
    oldPrice: CounterCoasts.Ironing.old,
    time: 60,
  },
  {
    title: "Space organizer",
    icons: cleanClothesSvg,
    price: CounterCoasts["Space organizer"].price,
    oldPrice: CounterCoasts["Space organizer"].old,
    time: 60,
  },
  {
    title: "Wardrobe cleaning",
    icons: closetSvg,
    price: CounterCoasts["Wardrobe cleaning"].price,
    oldPrice: CounterCoasts["Wardrobe cleaning"].old,
    time: 30,
  },
  {
    title: "Wash dishes",
    icons: cleanDishesSvg,
    price: CounterCoasts["Wash dishes"].price,
    oldPrice: CounterCoasts["Wash dishes"].old,
    time: 15,
  },
  {
    title: "Water plants",
    icons: wateringPlantsSvg,
    price: CounterCoasts["Water plants"].price,
    oldPrice: CounterCoasts["Water plants"].old,
    time: 20,
  },
  {
    title: "Laundry",
    icons: laundrySvg,
    price: CounterCoasts.Laundry.price,
    oldPrice: CounterCoasts.Laundry.old,
    time: 15,
  },
  {
    title: "Wash the microwave",
    icons: microwaveSvg,
    price: CounterCoasts["Wash the microwave"].price,
    oldPrice: CounterCoasts["Wash the microwave"].old,
    time: 20,
  },
  {
    title: "Clean animal's tray",
    icons: petToiletTraySvg,
    price: CounterCoasts["Clean animal's tray"].price,
    oldPrice: CounterCoasts["Clean animal's tray"].old,
    time: 15,
  },
  {
    title: "Clean the mirror",
    icons: mirrorSvg,
    price: CounterCoasts["Clean the mirror"].price,
    oldPrice: CounterCoasts["Clean the mirror"].old,
    time: 15,
  },
  {
    title: "Clean slow-cooker",
    icons: SlowCooker,
    price: CounterCoasts["Clean slow-cooker"].price,
    oldPrice: CounterCoasts["Clean slow-cooker"].old,
    time: 15,
  },
  {
    title: "Clean coffee-machine",
    icons: coffeeMachineSvg,
    price: CounterCoasts["Clean coffee-machine"].price,
    oldPrice: CounterCoasts["Clean coffee-machine"].old,
    time: 15,
  },
  {
    title: "Two-seater sofa",
    icons: twoSeaterSofaSvg,
    price: CounterCoasts["Two-seater sofa"].price,
    oldPrice: CounterCoasts["Two-seater sofa"].old,
    time: 60,
  },
  {
    title: "Three-seater sofa",
    icons: threeSeaterSofaSvg,
    price: CounterCoasts["Three-seater sofa"].price,
    oldPrice: CounterCoasts["Three-seater sofa"].old,
    time: 75,
  },
  {
    title: "Four-seater sofa",
    icons: fourSeaterSofaSvg,
    price: CounterCoasts["Four-seater sofa"].price,
    oldPrice: CounterCoasts["Four-seater sofa"].old,
    time: 90,
  },
  {
    title: "Five-seater sofa",
    icons: fiveSeaterSofaSvg,
    price: CounterCoasts["Five-seater sofa"].price,
    oldPrice: CounterCoasts["Five-seater sofa"].old,
    time: 105,
  },
  {
    title: "Six-seater sofa",
    icons: sixSeaterSofaSvg,
    price: CounterCoasts["Six-seater sofa"].price,
    oldPrice: CounterCoasts["Six-seater sofa"].old,
    time: 120,
  },
  {
    title: "Upholstered to bed",
    icons: bedSvg,
    price: CounterCoasts["Upholstered to bed"].price,
    oldPrice: CounterCoasts["Upholstered to bed"].old,
    time: 60,
  },
  {
    title: "Carpet dry cleaning",
    icons: carpetSvg,
    price: CounterCoasts["Carpet dry cleaning"].price,
    oldPrice: CounterCoasts["Carpet dry cleaning"].old,
    time: 10,
  },
  {
    title: "Single mattress",
    icons: mattressSvg,
    price: CounterCoasts["Single mattress"].price,
    oldPrice: CounterCoasts["Single mattress"].old,
    time: 30,
  },
  {
    title: "Single mattress from both sides",
    icons: mattressSvg,
    price: CounterCoasts["Single mattress from both sides"].price,
    oldPrice: CounterCoasts["Single mattress from both sides"].old,
    time: 60,
  },
  {
    title: "Double mattress",
    icons: mattressDblSvg,
    price: CounterCoasts["Double mattress"].price,
    oldPrice: CounterCoasts["Double mattress"].old,
    time: 60,
  },
  {
    title: "Double mattress from both sides",
    icons: mattressDblSvg,
    price: CounterCoasts["Double mattress from both sides"].price,
    oldPrice: CounterCoasts["Double mattress from both sides"].old,
    time: 90,
  },
  {
    title: "Armchair",
    icons: sofaSvg,
    price: CounterCoasts.Armchair.price,
    oldPrice: CounterCoasts.Armchair.old,
    time: 30,
  },
  {
    title: "Chair",
    icons: chairSvg,
    price: CounterCoasts.Chair.price,
    oldPrice: CounterCoasts.Chair.old,
    time: 20,
  },
  {
    title: "Office chair",
    icons: officeChairSvg,
    price: CounterCoasts["Office chair"].price,
    oldPrice: CounterCoasts["Office chair"].old,
    time: 20,
  },
  {
    title: "Cleaning baby stroller",
    icons: babyStrollerSvg,
    price: CounterCoasts["Cleaning baby stroller"].price,
    oldPrice: CounterCoasts["Cleaning baby stroller"].old,
    time: 30,
  },
];

export interface ISubService {
  title: string;
  icons: string;
  price: number;
  oldPrice: string;
  time: number;
}

export const getSubServiceListByMainService = (
  mainService: string
): ISubService[] | [] => {
  switch (mainService) {
    case "After party":
    case "In a last minute":
    case "Window cleaning":
    case "Airbnb":
    case "Deep":
    case "Regular":
    case "Eco cleaning":
    case "Move in/out":
      return allServices.filter((el) => {
        const excludedTitles = [
          "Clean the cloak room",
          "Clean the mirror",
          "Clean the room",
          "Clean the kitchen",
          "Clean the corridor",
          "Clean the bathroom",
          "Cleaning bath or shower cubicle",

          "Two-seater sofa",
          "Three-seater sofa",
          "Four-seater sofa",
          "Five-seater sofa",
          "Six-seater sofa",
          "Upholstered to bed",
          "Carpet dry cleaning",
          "Single mattress",
          "Single mattress from both sides",
          "Double mattress",
          "Double mattress from both sides",
          "Armchair",
          "Chair",
          "Office chair",
          "Cleaning baby stroller",
        ];

        return !excludedTitles.includes(el.title);
      });

    case "Dry cleaning":
      return allServices.filter((el) => {
        const excludedTitles = [
          "Two-seater sofa",
          "Three-seater sofa",
          "Four-seater sofa",
          "Five-seater sofa",
          "Six-seater sofa",
          "Upholstered to bed",
          "Carpet dry cleaning",
          "Single mattress",
          "Single mattress from both sides",
          "Double mattress",
          "Double mattress from both sides",
          "Armchair",
          "Chair",
          "Office chair",
          "Cleaning baby stroller",
        ];

        return excludedTitles.includes(el.title);
      });

    case "Custom cleaning":
      return allServices;

    default:
      return [];
  }
};
