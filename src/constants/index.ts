// How much it costs
import Regular from "@/components/common/icons/services/regular.svg";
import Deep from "@/components/common/icons/services/deep.svg";
import WindowCleaning from "@/components/common/icons/services/window-cleaning.svg";
import EcoCleaning from "@/components/common/icons/services/eco-cleaning.svg";
import MoveInOut from "@/components/common/icons/services/move-in-out.svg";
import Subscription from "@/components/common/icons/services/subscription.svg";
import CustomCleaning from "@/components/common/icons/services/custom-cleaning.svg";
import AfterParty from "@/components/common/icons/services/after-party.svg";
import Office from "@/components/common/icons/services/office.svg";
import WhileSickness from "@/components/common/icons/services/while-sickness.svg";
import DeepKitchen from "@/components/common/icons/services/deep-kitchen.svg";
import Airbnb from "@/components/common/icons/services/airbnb.svg";
import DryCleaning from "@/components/common/icons/services/dry-cleaning.svg";
import PostConstruction from "@/components/common/icons/services/post-construction.svg";
import Ozonation from "@/components/common/icons/services/ozonation.svg";

export const Coasts = {
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
