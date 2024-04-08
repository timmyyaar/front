import { getOzonationMultiplier } from "@/utils";
import { ISubService } from "@/components/OrderPage/SubServicesList/utils";

export const getEstimateFromCounterByService = (
  mainService: string,
  counter: any
) => {
  switch (mainService) {
    case "Deep kitchen":
      return 360;

    case "While sickness":
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0 && el.value > 1) acc += (el.value - 1) * 45;
        if (i === 1 && el.value > 1) acc += (el.value - 1) * 30;
        if (i === 2 && el.value === "Kitchen") {
          return acc + 30;
        }

        return acc;
      }, 60);

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
      }, 360);

    case "Regular":
    case "Eco cleaning":
    case "Move in/out":
    case "Airbnb":
    case "After party":
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
          return acc + el.value * 10;
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

    default:
      return 0;
  }
};

export const getPriceFromCounterByService = (
  mainService: string,
  counter: any
) => {
  switch (mainService) {
    case "Deep kitchen":
      return 355;

    case "Custom cleaning":
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0 && el.value >= 1) acc += (el.value - 1) * 60;
        if (i === 1 && el.value >= 1) acc += (el.value - 1) * 80;
        if (i === 2 && el.value === "Kitchen") acc += 30;

        return acc;
      }, 199);

    case "Deep":
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0 && el.value > 1) acc += (el.value - 1) * 60;
        if (i === 1 && el.value > 1) acc += (el.value - 1) * 80;
        if (i === 2 && el.value === "Kitchen") acc += 30;

        return acc;
      }, 499);

    case "After party":
    case "In a last minute":
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0 && el.value > 1) acc += (el.value - 1) * 60;
        if (i === 1 && el.value > 1) acc += (el.value - 1) * 80;
        if (i === 2) {
          if (el.value === "Kitchen") {
            acc += 80;
          } else {
            acc += 50;
          }
        }

        return acc;
      }, 320);

    case "While sickness":
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0 && el.value > 1) acc += (el.value - 1) * 40;
        if (i === 1 && el.value > 1) acc += (el.value - 1) * 60;

        return acc;
      }, 155);

    case "Move in/out":
    case "Airbnb":
    case "Regular":
    case "Eco cleaning":
    case "Subscription":
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0 && el.value > 1) acc += (el.value - 1) * 40;
        if (i === 1 && el.value > 1) acc += (el.value - 1) * 50;
        if (i === 2 && el.value === "Kitchen") acc += 30;

        return acc;
      }, 199);

    case "Office":
      return counter.reduce((acc: number, el: any, i: number) => {
        acc += el.value * 2.5;
        return acc;
      }, 0);

    case "Ozonation":
      return counter.reduce((acc: number, { value }: any, i: number) => {
        if (i === 0) acc += value * getOzonationMultiplier(value);
        if (i === 1) acc += value * 40;

        return acc;
      }, 0);

    case "Post-construction":
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0) {
          acc += el.value * 50;
        } else if (i === 1) {
          acc += el.value * 6;
        }

        return acc;
      }, 0);

    case "Dry cleaning":
      return counter.reduce((acc: number, el: any, i: number) => {
        const minimalSofaSeats = 2;

        if (i === 0) {
          acc += el.value * 10;
        } else if (i === 1 && el.value > 0) {
          acc +=
            el.value === minimalSofaSeats
              ? 155
              : (el.value - minimalSofaSeats) * 15 + 155;
        }

        return acc;
      }, 0);

    case "Window cleaning":
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0) acc += el.value * 30;
        if (i === 1) acc += el.value * 2.5;

        return acc;
      }, 0);

    default:
      return 0;
  }
};

export const getMinimalPriceByMainService = (mainService: string) => {
  switch (mainService) {
    case "Custom cleaning":
    case "Subscription":
    case "Airbnb":
    case "Move in/out":
    case "Eco cleaning":
    case "Regular":
      return 199;

    case "While sickness":
      return 155;

    case "After party":
    case "In a last minute":
      return 370;
    case "Deep":
      return 499;
    case "Deep kitchen":
      return 355;

    case "Office":
    case "Ozonation":
    case "Window cleaning":
    case "Dry cleaning":
      return 150;

    case "Post-construction":
      return 199;

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
    (acc: number, el: ISubService) => (acc += el?.time || 0),
    0
  );
  const divider = title === "Dry cleaning" ? 720 : 480;

  const subTotal =
    countEstimate + subServiceEstimate + (isPrivateHouse ? 60 : 0);

  const cleanersCount = Math.ceil(subTotal / divider) + manualCleanersCount;
  const total =
    subTotal > divider || manualCleanersCount > 0
      ? subTotal / cleanersCount
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

export const getSubServices = (data: ISubService[]) => {
  const result: string[] = [];

  data.forEach((el: any) => {
    if (!result.includes(el.title)) result.push(el.title);
  });

  return result;
};

export const getServicePriceBasedOnManualCleaners = (
  price: number,
  cleanersCount: number,
  manualCleanersCount: number
) => {
  if (!manualCleanersCount) {
    return price;
  }

  const basicPercentForOneCleaner = Math.pow(0.75, cleanersCount);
  const extraPriceForEachExtraCleaner = price * basicPercentForOneCleaner;
  const extraPrice = manualCleanersCount * extraPriceForEachExtraCleaner;
  const extraPriceRounded = Number(parseFloat(extraPrice.toFixed(1)));

  return price + extraPriceRounded;
};
