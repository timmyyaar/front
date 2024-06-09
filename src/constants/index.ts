// How much it costs
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

export const SHOW_CORRIDOR_TITLES = [
  "Regular",
  "Deep",
  "Eco cleaning",
  "Move in/out",
  "After party",
  "While sickness",
  "Airbnb",
];
