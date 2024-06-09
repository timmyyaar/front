import Regular from "@/components/common/icons/services/regular.svg";
import Deep from "@/components/common/icons/services/deep.svg";
import EcoCleaning from "@/components/common/icons/services/eco-cleaning.svg";
import CustomCleaning from "@/components/common/icons/services/custom-cleaning.svg";
import Office from "@/components/common/icons/services/office.svg";
import PostConstruction from "@/components/common/icons/services/post-construction.svg";
import DryCleaning from "@/components/common/icons/services/dry-cleaning.svg";
import Ozonation from "@/components/common/icons/services/ozonation.svg";
import WhileSickness from "@/components/common/icons/services/while-sickness.svg";
import WindowCleaning from "@/components/common/icons/services/window-cleaning.svg";
import MoveInOut from "@/components/common/icons/services/move-in-out.svg";
import DeepKitchen from "@/components/common/icons/services/deep-kitchen.svg";
import AfterParty from "@/components/common/icons/services/after-party.svg";
import Airbnb from "@/components/common/icons/services/airbnb.svg";
import InaLastMinute from "@/components/common/icons/services/in-a-last-minute.svg";

interface IService {
  [key: string]: { title: string; icon: any }[];
}

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
  LAST_MINUTE: "In a last minute",
  SUBSCRIPTION: "Subscription",
};

export const SERVICES: IService = {
  "General cleaning": [
    { title: "Regular", icon: Regular },
    { title: "Deep", icon: Deep },
    { title: "Eco cleaning", icon: EcoCleaning },
    { title: "Custom cleaning", icon: CustomCleaning },
    { title: "Office", icon: Office },
    { title: "Post-construction", icon: PostConstruction },
  ],
  Healthcare: [
    { title: "Dry cleaning", icon: DryCleaning },
    { title: "Ozonation", icon: Ozonation },
    { title: "While sickness", icon: WhileSickness },
  ],
  "Special cleaning": [
    { title: "Window cleaning", icon: WindowCleaning },
    { title: "Move in/out", icon: MoveInOut },
    { title: "Deep kitchen", icon: DeepKitchen },
    { title: "After party", icon: AfterParty },
    { title: "Airbnb", icon: Airbnb },
    { title: "In a last minute", icon: InaLastMinute },
  ],
};

export const PRIVATE_HOUSE_SERVICES = [
  "In a last minute",
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
  { name: "Kraków", price: 0 },
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
