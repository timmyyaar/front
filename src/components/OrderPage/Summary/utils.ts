import { capitalizeFirstLetter, getOzonationMultiplier } from "@/utils";
import {
  ISubService,
  SelectedSubService,
} from "@/components/OrderPage/SubServicesList/utils";
import { Counter, Prices } from "@/types";
import { BRACKETS_REGEX, SHOW_CORRIDOR_TITLES } from "@/constants";

export const getEstimateFromCounterByService = (
  mainService: string,
  counter: any
) => {
  switch (mainService) {
    case "Deep kitchen":
      return 360;

    case "Move in/out":
    case "Deep":
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0 && el.value > 1) {
          return acc + (el.value - 1) * 60;
        } else if (i === 1 && el.value > 1) {
          return acc + (el.value - 1) * 90;
        } else if (el.value === "Kitchen") {
          return acc + 30;
        }

        return acc;
      }, 210);

    case "After party":
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0 && el.value !== 1) {
          return acc + (el.value - 1) * 60;
        } else if (i === 1 && el.value !== 1) {
          return acc + (el.value - 1) * 60;
        } else if (el.value === "Kitchen") {
          return acc + 30;
        }

        return acc;
      }, 210);

    case "While sickness":
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0 && el.value > 1) acc += (el.value - 1) * 45;
        if (i === 1 && el.value > 1) acc += (el.value - 1) * 30;
        if (i === 2 && el.value === "Kitchen") {
          return acc + 30;
        }

        return acc;
      }, 60);

    case "Office":
      return counter.reduce((acc: number, el: any) => {
        if (el.value <= 100) {
          return acc + 180;
        } else {
          return acc + 180 + (el.value - 100);
        }
      }, 0);

    case "Ozonation":
      return counter.reduce((acc: number, el: any) => {
        if (el.value <= 100) {
          return acc + 180;
        } else {
          return acc + 180 + (el.value - 100);
        }
      }, 0);

    case "Post-construction":
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0) {
          return acc + el.value * 60;
        } else if (i === 1) {
          return acc + el.value * 6;
        }

        return acc;
      }, 0);

    case "Window cleaning":
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0) {
          return acc + el.value * 30;
        } else if (i === 1) {
          return acc + el.value;
        }

        return acc;
      }, 0);

    case "Regular":
    case "Eco cleaning":
    case "Airbnb":
    case "Subscription":
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0 && el.value !== 1) {
          return acc + (el.value - 1) * 30;
        } else if (i === 1 && el.value !== 1) {
          return acc + (el.value - 1) * 60;
        } else if (el.value === "Kitchen") {
          return acc + 30;
        }

        return acc;
      }, 180);

    default:
      return 0;
  }
};

const getDefaultCounterPrice = (
  counter: Counter[],
  prices: Prices,
  prefix: string
) => {
  const bedroomPrice = prices[`${prefix}Bedroom`];
  const bathroomPrice = prices[`${prefix}Bathroom`];
  const kitchenPrice = prices[`${prefix}Kitchen`];
  const defaultPrice = prices[`default${capitalizeFirstLetter(prefix)}`];

  return counter.reduce((acc: number, el: any, i: number) => {
    if (i === 0 && el.value > 1) acc += (el.value - 1) * bedroomPrice;
    if (i === 1 && el.value > 1) acc += (el.value - 1) * bathroomPrice;
    if (i === 2 && el.value === "Kitchen") acc += kitchenPrice;

    return acc;
  }, defaultPrice);
};

export const getPriceFromCounterByService = (
  prices: Prices,
  mainService: string,
  counter: Counter[]
) => {
  switch (mainService) {
    case "Deep kitchen":
      return prices.defaultDeepKitchen;

    case "Deep":
      return getDefaultCounterPrice(counter, prices, "deep");

    case "Move in/out":
      return getDefaultCounterPrice(counter, prices, "moveInOut");

    case "After party":
      return getDefaultCounterPrice(counter, prices, "afterParty");

    case "In a last minute":
      return getDefaultCounterPrice(counter, prices, "lastMinute");

    case "While sickness":
      return getDefaultCounterPrice(counter, prices, "whileSickness");

    case "Airbnb":
      return getDefaultCounterPrice(counter, prices, "airbnb");

    case "Regular":
      return getDefaultCounterPrice(counter, prices, "regular");

    case "Subscription":
      return getDefaultCounterPrice(counter, prices, "subscription");

    case "Eco cleaning":
      return getDefaultCounterPrice(counter, prices, "eco");

    case "Office":
      return counter.reduce((acc: number, el: any, i: number) => {
        acc += el.value * prices.officeSquareMeter;
        return acc;
      }, prices.defaultOffice);

    case "Ozonation":
      return counter.reduce((acc: number, { value }: any, i: number) => {
        if (i === 0) acc += value * getOzonationMultiplier(prices, value);

        return acc;
      }, prices.defaultOzonation);

    case "Post-construction":
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0) {
          acc += el.value * prices.postConstructionWindow;
        } else if (i === 1) {
          acc += el.value * prices.postConstructionSquareMeter;
        }

        return acc;
      }, prices.defaultPostConstruction);

    case "Window cleaning":
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0) acc += el.value * prices.window;
        if (i === 1) acc += el.value * prices.windowBalconySquareMeter;

        return acc;
      }, prices.defaultWindow);

    case "Dry cleaning":
      return prices.defaultDry;

    case "Custom cleaning":
      return prices.defaultCustom;

    default:
      return 0;
  }
};

export const getMinimalPriceByMainService = (
  prices: Prices,
  mainService: string
) => {
  switch (mainService) {
    case "Custom cleaning":
      return prices.minimalCustom;
    case "Subscription":
      return prices.minimalSubscription;
    case "Airbnb":
      return prices.minimalAirbnb;
    case "Move in/out":
      return prices.minimalMoveInOut;
    case "Eco cleaning":
      return prices.minimalEco;
    case "Regular":
      return prices.minimalRegular;
    case "While sickness":
      return prices.minimalWhileSickness;
    case "After party":
      return prices.minimalAfterParty;
    case "In a last minute":
      return prices.minimalLastMinute;
    case "Deep":
      return prices.minimalDeep;
    case "Deep kitchen":
      return prices.minimalDeepKitchen;
    case "Office":
      return prices.minimalOffice;
    case "Ozonation":
      return prices.minimalOzonation;
    case "Window cleaning":
      return prices.minimalWindow;
    case "Dry cleaning":
      return prices.minimalDry;
    case "Post-construction":
      return prices.minimalPostConstruction;

    default:
      return 199;
  }
};

export const getNewPrice = (
  originalPrice: number,
  discountPercentage: number
) => {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = originalPrice - discountAmount;

  return parseFloat(discountedPrice.toFixed(1));
};

export const makeSaleFromSub = (number: number, percentageString: string) => {
  const match = percentageString.match(/^(-?\d*\.?\d+)\s*%$/);

  if (match) {
    const percentage = parseFloat(match[1]);

    if (!isNaN(percentage)) {
      const result = number + (number * percentage) / 100;

      return parseFloat(result.toFixed(1));
    }
  }

  return parseFloat(number.toFixed(1));
};

export const getPriceWithSaleOrSubSale = (
  price: number,
  sale: number,
  subSale: string,
  discount: number
) => {
  if (subSale) {
    return makeSaleFromSub(price, subSale);
  }

  if (Boolean(sale) && Boolean(discount)) {
    if (sale > 0 && discount > 0) {
      const higherDiscount = Math.max(sale, discount);

      return getNewPrice(price, higherDiscount);
    } else {
      return getNewPrice(price, sale + discount);
    }
  } else if (sale) {
    return getNewPrice(price, sale);
  } else if (discount) {
    return getNewPrice(price, discount);
  }

  return price;
};

export const getServiceEstimate = (
  title: string,
  counter: any,
  subService: any,
  manualCleanersCount: number,
  isPrivateHouse?: boolean
) => {
  const countEstimate = getEstimateFromCounterByService(title, counter);
  const subServiceEstimate = subService.reduce(
    (acc: number, el: SelectedSubService) => {
      if (el.title === "Office cleaning") {
        if (el.count <= 100) {
          return acc + 180;
        } else {
          return acc + 180 + (el.count - 100);
        }
      }

      return acc + el.time * el.count;
    },
    0
  );
  const divider = title === "Dry cleaning" ? 720 : 480;

  const subTotal =
    countEstimate + subServiceEstimate + (isPrivateHouse ? 60 : 0);
  const cleanersCount = Math.ceil(subTotal / divider);

  const cleanersAndManualCleanersCount =
    Math.ceil(subTotal / divider) + manualCleanersCount;
  const total =
    subTotal > divider || manualCleanersCount > 0
      ? subTotal / cleanersAndManualCleanersCount
      : subTotal;

  return {
    time: `${Math.floor(total / 60)}h, ${Math.round(total % 60)}m`,
    cleanersCount,
  };
};

export const getHitherEstimate = (
  mainEstimate: string,
  secondEstimate: string
) => {
  const getTimeNumber = (estimate: string) =>
    Number(estimate.match(/\d+/g)?.join(".") || 0);
  const mainEstimateNumber = getTimeNumber(mainEstimate);
  const secondEstimateNumber = getTimeNumber(secondEstimate);

  if (mainEstimateNumber > secondEstimateNumber) {
    return mainEstimate;
  } else if (secondEstimateNumber > mainEstimateNumber) {
    return secondEstimate;
  }

  return mainEstimate;
};

export const getServicePriceBasedOnManualCleaners = (
  price: number,
  cleanersCount: number,
  manualCleanersCount: number
) => {
  if (!manualCleanersCount) {
    return price;
  }

  const basicPercentForOneCleaner = Math.pow(0.25, cleanersCount);
  const extraPriceForEachExtraCleaner = price * basicPercentForOneCleaner;
  const extraPrice = manualCleanersCount * extraPriceForEachExtraCleaner;
  const extraPriceRounded = Number(parseFloat(extraPrice.toFixed(1)));

  return price + extraPriceRounded;
};

export const getSubServiceWithBalcony = (subService: string) => {
  const balconyMatch = subService.match(/Balcony_summery\s+\(\d+\)/)?.[0];

  if (!balconyMatch) {
    return subService;
  }

  const metersSquare = balconyMatch.match(/\d+/);
  const balconyWithMetersSquare = balconyMatch.replace(
    metersSquare as any,
    `${metersSquare}m2`
  );

  return subService.replace(balconyMatch, balconyWithMetersSquare);
};

export const getSubServiceWithCarpet = (subService: string) => {
  const carpetMatch = subService.match(
    /Carpet\sdry\scleaning_summery\s+\(\d+\)/
  )?.[0];

  if (!carpetMatch) {
    return subService;
  }

  const metersSquare = carpetMatch.match(/\d+/);
  const carpetWithMetersSquare = carpetMatch.replace(
    metersSquare as any,
    `${metersSquare}m2`
  );

  return subService.replace(carpetMatch, carpetWithMetersSquare);
};

export const getTranslatedServices = (
  t: (text: string) => string,
  services: string,
  title?: string
) => {
  let transformedServicesString = services;

  if (title && SHOW_CORRIDOR_TITLES.includes(title)) {
    transformedServicesString = `${transformedServicesString}, ${t(
      "Corridor"
    )} (1)`;
  }

  services
    .split(BRACKETS_REGEX)
    .map((service) => service.trim())
    .forEach((service) => {
      transformedServicesString = transformedServicesString.replace(
        service,
        t(service)
      );
    });

  return transformedServicesString;
};

export const getPaymentIntentDescription = (
  payload: any,
  t: (text: string) => string
) => {
  let paymentDescription = `Customer name: ${payload.name}; Date: ${payload.date}; `;

  const addCounterAndSubService = (
    counter: string,
    title: string,
    subService: string
  ) => {
    const translatedSubServices = getTranslatedServices(
      t,
      getSubServiceWithBalcony(getSubServiceWithCarpet(subService || ""))
    );

    if (counter) {
      paymentDescription =
        paymentDescription +
        `${title}: ` +
        getTranslatedServices(t, counter, title);

      if (subService) {
        paymentDescription =
          paymentDescription +
          `, Additional services: ${translatedSubServices}`;
      }
    } else {
      paymentDescription =
        paymentDescription + `${title}: ` + translatedSubServices;
    }
  };

  addCounterAndSubService(payload.counter, payload.title, payload.subService);

  if (payload.secTitle) {
    paymentDescription = paymentDescription + "; ";

    addCounterAndSubService(
      payload.secCounter,
      payload.secTitle,
      payload.secSubService
    );
  }

  return paymentDescription;
};
