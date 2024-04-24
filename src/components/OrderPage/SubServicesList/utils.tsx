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
import officeSvg from "./icons/office.svg";

const getRoundedServicePrice = (number: number) =>
  Number(parseFloat(number.toFixed(1)));

export const allServices = (priceMultiplier: number = 1): ISubService[] => [
  // {
  //   title: "Office cleaning",
  //   icons: officeSvg,
  //   originalPrice: CounterCoasts["Office cleaning"].price,
  //   price: getRoundedServicePrice(
  //     priceMultiplier * CounterCoasts["Office cleaning"].price
  //   ),
  //   oldPrice:
  //     priceMultiplier === 1 ? "" : CounterCoasts["Office cleaning"].price,
  //   time: 1,
  // },
  {
    title: "Clean the room",
    icons: readingRoomSvg,
    originalPrice: CounterCoasts["Clean the room"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Clean the room"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Clean the room"].price,
    time: 30,
  },
  {
    title: "Clean the bathroom",
    icons: bathroomSvg,
    originalPrice: CounterCoasts["Clean the bathroom"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Clean the bathroom"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Clean the bathroom"].price,
    time: 60,
  },
  {
    title: "Clean the kitchen",
    icons: kitchenSvg,
    originalPrice: CounterCoasts["Clean the kitchen"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Clean the kitchen"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Clean the kitchen"].price,
    time: 60,
  },
  {
    title: "Clean the corridor",
    icons: corredSvg,
    originalPrice: CounterCoasts["Clean the corridor"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Clean the corridor"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Clean the corridor"].price,
    time: 30,
  },
  {
    title: "Clean the cloak room",
    icons: hangerSvg,
    originalPrice: CounterCoasts["Clean the cloak room"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Clean the cloak room"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Clean the cloak room"].price,
    time: 30,
  },
  {
    title: "Wash the window",
    icons: windowSvg,
    originalPrice: CounterCoasts["Wash the window"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Wash the window"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Wash the window"].price,
    time: 30,
  },
  {
    title: "Balcony",
    icons: balconySvg,
    originalPrice: CounterCoasts.Balcony.price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts.Balcony.price
    ),
    oldPrice: priceMultiplier === 1 ? "" : CounterCoasts.Balcony.price,
    time: 1,
  },
  {
    title: "Clean the oven",
    icons: ovenSvg,
    originalPrice: CounterCoasts["Clean the oven"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Clean the oven"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Clean the oven"].price,
    time: 60,
  },
  {
    title: "Clean the fridge",
    icons: fridgeSvg,
    originalPrice: CounterCoasts["Clean the fridge"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Clean the fridge"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Clean the fridge"].price,
    time: 45,
  },
  {
    title: "Clean kitchen cabinets",
    icons: kitchenCabinets,
    originalPrice: CounterCoasts["Clean kitchen cabinets"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Clean kitchen cabinets"].price
    ),
    oldPrice:
      priceMultiplier === 1
        ? ""
        : CounterCoasts["Clean kitchen cabinets"].price,
    time: 75,
  },
  {
    title: "Clean the hood",
    icons: cookerHoodSvg,
    originalPrice: CounterCoasts["Clean the hood"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Clean the hood"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Clean the oven"].price,
    time: 45,
  },
  {
    title: "Extra tasks",
    icons: hoursglassSvg,
    originalPrice: CounterCoasts["Extra tasks"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Extra tasks"].price
    ),
    oldPrice: priceMultiplier === 1 ? "" : CounterCoasts["Extra tasks"].price,
    time: 60,
  },
  {
    title: "Cleaning bath or shower cubicle",
    icons: iconsSvg,
    originalPrice: CounterCoasts["Cleaning bath or shower cubicle"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Cleaning bath or shower cubicle"].price
    ),
    oldPrice:
      priceMultiplier === 1
        ? ""
        : CounterCoasts["Cleaning bath or shower cubicle"].price,
    time: 30,
  },
  {
    title: "Ironing",
    icons: ironSvg,
    originalPrice: CounterCoasts.Ironing.price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts.Ironing.price
    ),
    oldPrice: priceMultiplier === 1 ? "" : CounterCoasts.Ironing.price,
    time: 60,
  },
  {
    title: "Space organizer",
    icons: cleanClothesSvg,
    originalPrice: CounterCoasts["Space organizer"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Space organizer"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Space organizer"].price,
    time: 60,
  },
  {
    title: "Wardrobe cleaning",
    icons: closetSvg,
    originalPrice: CounterCoasts["Wardrobe cleaning"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Wardrobe cleaning"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Wardrobe cleaning"].price,
    time: 30,
  },
  {
    title: "Wash dishes",
    icons: cleanDishesSvg,
    originalPrice: CounterCoasts["Wash dishes"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Wash dishes"].price
    ),
    oldPrice: priceMultiplier === 1 ? "" : CounterCoasts["Wash dishes"].price,
    time: 15,
  },
  {
    title: "Water plants",
    icons: wateringPlantsSvg,
    originalPrice: CounterCoasts["Water plants"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Water plants"].price
    ),
    oldPrice: priceMultiplier === 1 ? "" : CounterCoasts["Water plants"].price,
    time: 20,
  },
  {
    title: "Laundry",
    icons: laundrySvg,
    originalPrice: CounterCoasts.Laundry.price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts.Laundry.price
    ),
    oldPrice: priceMultiplier === 1 ? "" : CounterCoasts.Laundry.price,
    time: 15,
  },
  {
    title: "Wash the microwave",
    icons: microwaveSvg,
    originalPrice: CounterCoasts["Wash the microwave"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Wash the microwave"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Wash the microwave"].price,
    time: 15,
  },
  {
    title: "Clean animal's tray",
    icons: petToiletTraySvg,
    originalPrice: CounterCoasts["Clean animal's tray"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Clean animal's tray"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Clean animal's tray"].price,
    time: 15,
  },
  {
    title: "Clean the mirror",
    icons: mirrorSvg,
    originalPrice: CounterCoasts["Clean the mirror"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Clean the mirror"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Clean the mirror"].price,
    time: 15,
  },
  {
    title: "Clean slow-cooker",
    icons: SlowCooker,
    originalPrice: CounterCoasts["Clean slow-cooker"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Clean slow-cooker"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Clean slow-cooker"].price,
    time: 15,
  },
  {
    title: "Clean coffee-machine",
    icons: coffeeMachineSvg,
    originalPrice: CounterCoasts["Clean coffee-machine"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Clean coffee-machine"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Clean coffee-machine"].price,
    time: 15,
  },
  {
    title: "Two-seater sofa",
    icons: twoSeaterSofaSvg,
    originalPrice: CounterCoasts["Two-seater sofa"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Two-seater sofa"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Two-seater sofa"].price,
    time: 60,
  },
  {
    title: "Three-seater sofa",
    icons: threeSeaterSofaSvg,
    originalPrice: CounterCoasts["Three-seater sofa"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Three-seater sofa"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Three-seater sofa"].price,
    time: 60,
  },
  {
    title: "Four-seater sofa",
    icons: fourSeaterSofaSvg,
    originalPrice: CounterCoasts["Four-seater sofa"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Four-seater sofa"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Four-seater sofa"].price,
    time: 60,
  },
  {
    title: "Five-seater sofa",
    icons: fiveSeaterSofaSvg,
    originalPrice: CounterCoasts["Five-seater sofa"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Five-seater sofa"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Five-seater sofa"].price,
    time: 60,
  },
  {
    title: "Six-seater sofa",
    icons: sixSeaterSofaSvg,
    originalPrice: CounterCoasts["Six-seater sofa"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Six-seater sofa"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Six-seater sofa"].price,
    time: 60,
  },
  {
    title: "Upholstered to bed",
    icons: bedSvg,
    originalPrice: CounterCoasts["Upholstered to bed"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Upholstered to bed"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Upholstered to bed"].price,
    time: 60,
  },
  {
    title: "Carpet dry cleaning",
    icons: carpetSvg,
    originalPrice: CounterCoasts["Carpet dry cleaning"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Carpet dry cleaning"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Carpet dry cleaning"].price,
    time: 10,
  },
  {
    title: "Single mattress",
    icons: mattressSvg,
    originalPrice: CounterCoasts["Single mattress"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Single mattress"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Single mattress"].price,
    time: 60,
  },
  {
    title: "Single mattress from both sides",
    icons: mattressSvg,
    originalPrice: CounterCoasts["Single mattress from both sides"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Single mattress from both sides"].price
    ),
    oldPrice:
      priceMultiplier === 1
        ? ""
        : CounterCoasts["Single mattress from both sides"].price,
    time: 60,
  },
  {
    title: "Double mattress",
    icons: mattressDblSvg,
    originalPrice: CounterCoasts["Double mattress"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Double mattress"].price
    ),
    oldPrice:
      priceMultiplier === 1 ? "" : CounterCoasts["Double mattress"].price,
    time: 60,
  },
  {
    title: "Double mattress from both sides",
    icons: mattressDblSvg,
    originalPrice: CounterCoasts["Double mattress from both sides"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Double mattress from both sides"].price
    ),
    oldPrice:
      priceMultiplier === 1
        ? ""
        : CounterCoasts["Double mattress from both sides"].price,
    time: 90,
  },
  {
    title: "Armchair",
    icons: sofaSvg,
    originalPrice: CounterCoasts.Armchair.price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts.Armchair.price
    ),
    oldPrice: priceMultiplier === 1 ? "" : CounterCoasts.Armchair.price,
    time: 30,
  },
  {
    title: "Chair",
    icons: chairSvg,
    originalPrice: CounterCoasts.Chair.price,
    price: getRoundedServicePrice(priceMultiplier * CounterCoasts.Chair.price),
    oldPrice: priceMultiplier === 1 ? "" : CounterCoasts.Chair.price,
    time: 30,
  },
  {
    title: "Office chair",
    icons: officeChairSvg,
    originalPrice: CounterCoasts["Office chair"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Office chair"].price
    ),
    oldPrice: priceMultiplier === 1 ? "" : CounterCoasts["Office chair"].price,
    time: 30,
  },
  {
    title: "Cleaning baby stroller",
    icons: babyStrollerSvg,
    originalPrice: CounterCoasts["Cleaning baby stroller"].price,
    price: getRoundedServicePrice(
      priceMultiplier * CounterCoasts["Cleaning baby stroller"].price
    ),
    oldPrice:
      priceMultiplier === 1
        ? ""
        : CounterCoasts["Cleaning baby stroller"].price,
    time: 30,
  },
];

const getSubService = (title: string, priceMultiplier = 1): ISubService => {
  const allSubServices = allServices(priceMultiplier);

  return allSubServices.find((subService) => title === subService.title)!;
};

export const getDefaultSubServicesByService = (
  service: string
): ISubService[] => {
  const balcony = getSubService("Balcony");
  const fridge = getSubService("Clean the fridge");
  const oven = getSubService("Clean the oven");
  const kitchenCabinets = getSubService("Clean kitchen cabinets");
  const hood = getSubService("Clean the hood");
  const wardrobe = getSubService("Wardrobe cleaning");
  const microWave = getSubService("Wash the microwave");
  const dishes = getSubService("Wash dishes");

  switch (service) {
    case "Move in/out":
    case "Deep":
      return [
        ...Array.from({ length: 5 }).map(() => ({ ...balcony })),
        { ...fridge },
        { ...oven },
        { ...kitchenCabinets },
        { ...hood },
        { ...wardrobe },
        { ...microWave },
      ];
    case "After party":
      return [
        ...Array.from({ length: 5 }).map(() => ({ ...balcony })),
        { ...fridge },
        { ...oven },
        { ...kitchenCabinets },
        { ...microWave },
        { ...dishes },
      ];
    default:
      return [];
  }
};

export interface ISubService {
  title: string;
  icons: string;
  price: number;
  originalPrice: number;
  oldPrice: string | number;
  time: number;
}

export const getSubServiceListByMainService = (
  mainService: string,
  priceMultiplier: number = 1
) => {
  switch (mainService) {
    case "After party":
    case "In a last minute":
    case "Window cleaning":
    case "Airbnb":
    case "Deep":
    case "Regular":
    case "Eco cleaning":
    case "Move in/out":
      return allServices(priceMultiplier).filter((el) => {
        const excludedTitles = [
          "Clean the cloak room",
          "Clean the mirror",
          "Clean the room",
          "Clean the kitchen",
          "Clean the corridor",
          "Clean the bathroom",
          "Cleaning bath or shower cubicle",
          "Office cleaning",

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
      return allServices(priceMultiplier).filter((el) => {
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

    case "Subscription":
      return allServices(priceMultiplier).filter((el) => {
        const excludedTitles = [
          "Clean the room",
          "Clean the kitchen",
          "Clean the corridor",
          "Clean the bathroom",
        ];

        return !excludedTitles.includes(el.title);
      });

    case "Custom cleaning":
      return allServices(priceMultiplier).filter(
        (el) => el.title !== "Office cleaning"
      );

    default:
      return [];
  }
};
