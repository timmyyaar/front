import officePng from "@/assets/icons/sub-services/office.png";
import roomPng from "@/assets/icons/sub-services/room.png";
import bathroomPng from "@/assets/icons/sub-services/bathroom.png";
import kitchenPng from "@/assets/icons/sub-services/kitchen.png";
import corridorPng from "@/assets/icons/sub-services/corridor.png";
import cloakRoomPng from "@/assets/icons/sub-services/cloak-room.png";
import showerCubiclePng from "@/assets/icons/sub-services/shower-cubicle.png";
import mirrorPng from "@/assets/icons/sub-services/mirror.png";
import twoSeaterSofaPng from "@/assets/icons/sub-services/two-seater-sofa.png";
import threeSeaterSofaPng from "@/assets/icons/sub-services/three-seater-sofa.png";
import fourSeaterSofaPng from "@/assets/icons/sub-services/four_seater_sofa.png";
import upholsteredToBedPng from '@/assets/icons/sub-services/upholstered_to_bed.png'
import carpetPng from "@/assets/icons/sub-services/carpet.png";
import singleMattressPng from '@/assets/icons/sub-services/single-mattress.png'
import doubleMattressPng from '@/assets/icons/sub-services/double-mattress.png'
import armchairPng from '@/assets/icons/sub-services/armchair.png'
import chairPng from '@/assets/icons/sub-services/chair.png'
import officeChairPng from '@/assets/icons/sub-services/office-chair.png'
import babyStrollerPng from '@/assets/icons/sub-services/baby-stroller.png'
import ownSuppliesPng from '@/assets/icons/sub-services/own-supplies.png'
import vacuumCleanerPng from '@/assets/icons/sub-services/vacuum-cleaner.png'
import coffeeMachinePng from "@/assets/icons/sub-services/coffee-machine.png";
import spaceOrganizerPng from "@/assets/icons/sub-services/space-organizer.png";
import dishesPng from "@/assets/icons/sub-services/dishes.png";
import hoodPng from "@/assets/icons/sub-services/hood.png";
import fridgePng from "@/assets/icons/sub-services/fridge.png";
import extraTasksPng from "@/assets/icons/sub-services/extra-tasks.png";
import ironPng from "@/assets/icons/sub-services/iron.png";
import wardrobePng from "@/assets/icons/sub-services/wardrobe.png";
import laundryPng from "@/assets/icons/sub-services/laundry.png";
import microwavePng from "@/assets/icons/sub-services/microwave.png";
import ovenPng from "@/assets/icons/sub-services/oven.png";
import animalsTrayPng from "@/assets/icons/sub-services/animals-tray.png";
import balconyPng from "@/assets/icons/sub-services/balcony.png";
import plantsPng from "@/assets/icons/sub-services/plants.png";
import windowPng from "@/assets/icons/sub-services/window.png";
import kitchenCabinetsPng from "@/assets/icons/sub-services/kitchen-cabinets.png";

export const ALL_SERVICE = {
  REGULAR: "Regular",
  DEEP: "Deep",
  ECO: "Eco cleaning",
  CUSTOM: "Custom cleaning",
  OFFICE: "Office",
  POST_CONSTRUCTION: "Post-construction",
  DRY: "Dry cleaning",
  OZONATION: "Ozonation",
  WHILE_SICKNESS: "While sickness",
  WINDOW: "Window cleaning",
  MOVE_IN_OUT: "Move in/out",
  DEEP_KITCHEN: "Deep kitchen",
  AFTER_PARTY: "After party",
  AIRBNB: "Airbnb",
  SUBSCRIPTION: "Subscription",
};

export const PRIVATE_HOUSE_SERVICES = [
  "After party",
  "Custom cleaning",
  "Airbnb",
  "Move in/out",
  "Eco cleaning",
  "Regular",
  "Deep",
];

export const OWN_SUPPLES_SERVICE_NAME = "Own_supplies_sub_service";

export const CITIES = [
  { name: "Krakow", price: 0 },
  { name: "Wieliczka", price: 30 },
  { name: "Skawina", price: 30 },
  { name: "Niepolimice", price: 30 },
  { name: "Zielonki", price: 30 },
  { name: "Modlniczka", price: 30 },
  { name: "Liszki", price: 30 },
  { name: "Kryspinow", price: 30 },
  { name: "Cholerzyn", price: 30 },
  { name: "Zabierzow", price: 30 },
  { name: "Wegrzce", price: 30 },
  { name: "Swoszowice", price: 30 },
  { name: "Mogilany", price: 30 },
  { name: "Michałowice", price: 40 },
  { name: "Luborzyca", price: 30 },
  { name: "Balice", price: 30 },
  { name: "Libertów", price: 30 },
  { name: "Modlnica", price: 30 },
  { name: "Wołowice", price: 50 },
  { name: "Węgrzce Wielkie", price: 30 },
  { name: "Bibice", price: 30 },
  { name: "Kozierów", price: 50 },
  { name: "Piekary", price: 30 },
  { name: "Skala", price: 50 },
  { name: "Krzywaczka", price: 60 },
  { name: "Książniczki", price: 30 },
  { name: "Wrząsowice", price: 30 },
  { name: "Rudawa", price: 50 },
  { name: "Szczyglice", price: 30 },
  { name: "Jerzmanowice", price: 50 },
  { name: "Stojowice", price: 60 },
  { name: "Chrzanów", price: 100 },
  { name: "Rudno", price: 60 },
  { name: "Tenczynek", price: 60 },
  { name: "Ostrężnica", price: 60 },
  { name: "Czajowice", price: 50 },
  { name: "Czasław", price: 100 },
  { name: "Trojanowice", price: 30 },
  { name: "Czarnochowice", price: 30 },
  { name: "Łuczyce", price: 40 },
  { name: "Ryczów", price: 80 },
  { name: "Wielkie Drogi", price: 60 },
  { name: "Jaśkowice", price: 70 },
  { name: "Budzyń", price: 30 },
  { name: "Morawica", price: 30 },
  { name: "Rzeszotary", price: 40 },
  { name: "Kokotów", price: 30 },
  { name: "Miechów", price: 70 },
  { name: "Krzeszowice", price: 50 },
  { name: "Myślenice", price: 50 },
  { name: "Brzeźnica", price: 50 },
];

export const ALL_SUB_SERVICES = [
  {
    title: "Office cleaning",
    icons: officePng,
  },
  {
    title: "Clean the room",
    icons: roomPng,
  },
  {
    title: "Clean the bathroom",
    icons: bathroomPng,
  },
  {
    title: "Clean the kitchen",
    icons: kitchenPng,
  },
  {
    title: "Clean the corridor",
    icons: corridorPng,
  },
  {
    title: "Clean the cloak room",
    icons: cloakRoomPng,
  },
  {
    title: "Wash the window",
    icons: windowPng,
  },
  {
    title: "Balcony",
    icons: balconyPng,
  },
  {
    title: "Clean the oven",
    icons: ovenPng,
  },
  {
    title: "Clean the fridge",
    icons: fridgePng,
  },
  {
    title: "Clean kitchen cabinets",
    icons: kitchenCabinetsPng,
  },
  {
    title: "Clean the hood",
    icons: hoodPng,
  },
  {
    title: "Extra tasks",
    icons: extraTasksPng,
  },
  {
    title: "Cleaning bath or shower cubicle",
    icons: showerCubiclePng,
  },
  {
    title: "Ironing",
    icons: ironPng,
  },
  {
    title: "Space organizer",
    icons: spaceOrganizerPng,
  },
  {
    title: "Wardrobe cleaning",
    icons: wardrobePng,
  },
  {
    title: "Wash dishes",
    icons: dishesPng,
  },
  {
    title: "Water plants",
    icons: plantsPng,
  },
  {
    title: "Laundry",
    icons: laundryPng,
  },
  {
    title: "Wash the microwave",
    icons: microwavePng,
  },
  {
    title: "Clean animal's tray",
    icons: animalsTrayPng,
  },
  {
    title: "Clean the mirror",
    icons: mirrorPng,
  },
  {
    title: "Clean coffee-machine",
    icons: coffeeMachinePng,
  },
  {
    title: "Two-seater sofa",
    icons: twoSeaterSofaPng,
  },
  {
    title: "Three-seater sofa",
    icons: threeSeaterSofaPng,
  },
  {
    title: "Four-seater sofa",
    icons: fourSeaterSofaPng,
  },
  {
    title: "Five-seater sofa",
    icons: fourSeaterSofaPng,
  },
  {
    title: "Six-seater sofa",
    icons: fourSeaterSofaPng,
  },
  {
    title: "Upholstered to bed",
    icons: upholsteredToBedPng,
  },
  {
    title: "Carpet dry cleaning",
    icons: carpetPng,
  },
  {
    title: "Single mattress",
    icons: singleMattressPng,
  },
  {
    title: "Single mattress from both sides",
    icons: singleMattressPng,
  },
  {
    title: "Double mattress",
    icons: doubleMattressPng,
  },
  {
    title: "Double mattress from both sides",
    icons: doubleMattressPng,
  },
  {
    title: "Armchair",
    icons: armchairPng,
  },
  {
    title: "Chair",
    icons: chairPng,
  },
  {
    title: "Office chair",
    icons: officeChairPng,
  },
  {
    title: "Cleaning baby stroller",
    icons: babyStrollerPng,
  },
  {
    title: "Vacuum_cleaner_sub_service",
    icons: vacuumCleanerPng,
  },
  {
    title: "Own_supplies_sub_service",
    icons: ownSuppliesPng,
  },
];
