// How much it costs
import Regular from "@/assets/icons/main-services/regular.png";
import Deep from "@/assets/icons/main-services/deep.png";
import WindowCleaning from "@/assets/icons/main-services/window.png";
import EcoCleaning from "@/assets/icons/main-services/eco.png";
import MoveInOut from "@/assets/icons/main-services/move-in-out.png";
import Subscription from "@/assets/icons/main-services/subscription.png";
import CustomCleaning from "@/assets/icons/main-services/custom.png";
import AfterParty from "@/assets/icons/main-services/after-party.png";
import Office from "@/assets/icons/main-services/office.png";
import WhileSickness from "@/assets/icons/main-services/while-sickness.png";
import DeepKitchen from "@/assets/icons/main-services/deep-kitchen.png";
import Airbnb from "@/assets/icons/main-services/airbnb.png";
import DryCleaning from "@/assets/icons/main-services/dry.png";
import PostConstruction from "@/assets/icons/main-services/post-construction.png";
import Ozonation from "@/assets/icons/main-services/ozonation.png";

export const Costs = {
  "One-time": {
    "1-bedroom": 199,
    "2-bedroom": 239,
    "3-bedroom": 279,
  },
  "Once a week": {
    "1-bedroom": 159.2,
    "2-bedroom": 191.2,
    "3-bedroom": 223.2,
  },
  "Twice a month": {
    "1-bedroom": 169.15,
    "2-bedroom": 203.15,
    "3-bedroom": 237.15,
  },
  "Once a month": {
    "1-bedroom": 179.1,
    "2-bedroom": 215.1,
    "3-bedroom": 251.1,
  },
};

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const NUMBER_REGEX = /\d+/;

export const POSITIVE_NUMBER_EMPTY_REGEX = /^(\s*|[1-9][0-9]*)+$/;

export const MOBILE_PHONE_REGEX = /^\+[1-9]{1}[0-9]{3,14}$/;

export const FIGURE_BRACKETS_REGEX = /{([^}]*)}/g;

export const BRACKETS_REGEX = /\([^()]*\)/;

export const LOCALE_LOCAL_STORAGE_KEY = "locale";

export const MAIN_CATEGORIES_URLS = {
  GENERAL: "general",
  HEALTHCARE: "healthcare",
  SPECIAL: "special",
};

export const MAIN_CATEGORIES = {
  general: "General cleaning",
  healthcare: "Healthcare",
  special: "Special cleaning",
};

export const MAIN_CATEGORIES_REVERSED = Object.fromEntries(
  Object.entries(MAIN_CATEGORIES).map(([key, value]) => [value, key]),
);

export const CITIES = {
  KRAKOW: { name: "Krakow", isSingle: false },
  WARSAW: { name: "Warsaw", isSingle: true },
};

export const MAIN_SERVICES = [
  { title: "Regular", icon: Regular },
  { title: "Deep", icon: Deep },
  { title: "Window cleaning", icon: WindowCleaning },
  { title: "Eco cleaning", icon: EcoCleaning },
  { title: "Move in/out", icon: MoveInOut },
  { title: "Subscription", icon: Subscription },
  { title: "Custom cleaning", icon: CustomCleaning },
  { title: "After party", icon: AfterParty },
  { title: "Office", icon: Office },
  { title: "While sickness", icon: WhileSickness },
  { title: "Deep kitchen", icon: DeepKitchen },
  { title: "Airbnb", icon: Airbnb },
  { title: "Dry cleaning", icon: DryCleaning },
  { title: "Post-construction", icon: PostConstruction },
  { title: "Ozonation", icon: Ozonation },
];

export enum BLOG_TAGS {
  ALL = "All",
  WINDOW_CLEANING = "Windows cleaning",
  CLEANING_TIPS = "Cleaning tips",
  GENERAL_CLEANING = "General cleaning",
  DEEP_CLEANING = "Deep Cleaning",
}
