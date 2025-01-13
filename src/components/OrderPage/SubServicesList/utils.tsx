import { ISubService, MainService, Prices, SubService } from "@/types";
import { ALL_SUB_SERVICES } from "@/components/OrderPage/constants";

const getRoundedServicePrice = (number: number) =>
  Number(parseFloat(number.toFixed(1)));

const getSubService = (
  prices: Prices,
  title: string,
  subServices: SubService[],
) => {
  const allSubServices = subServices.map((subService) => ({
    ...subService,
    originalPrice: prices[subService.key],
    price: prices[subService.key],
    oldPrice: "",
    icons: ALL_SUB_SERVICES.find(({ title }) => title === subService.title)
      ?.icons,
  }));

  return allSubServices.find((subService) => title === subService.title)!;
};

export const getDefaultSubServicesByService = (
  prices: Prices,
  service: string,
  subServices: SubService[],
) => {
  const balcony = getSubService(prices, "Balcony", subServices);
  const fridge = getSubService(prices, "Clean the fridge", subServices);
  const oven = getSubService(prices, "Clean the oven", subServices);
  const kitchenCabinets = getSubService(
    prices,
    "Clean kitchen cabinets",
    subServices,
  );
  const hood = getSubService(prices, "Clean the hood", subServices);
  const wardrobe = getSubService(prices, "Wardrobe cleaning", subServices);
  const microWave = getSubService(prices, "Wash the microwave", subServices);
  const dishes = getSubService(prices, "Wash dishes", subServices);

  switch (service) {
    case "Move in/out":
    case "Deep":
      return [
        { ...balcony, count: 5 },
        { ...fridge, count: 1 },
        { ...oven, count: 1 },
        { ...kitchenCabinets, count: 1 },
        { ...hood, count: 1 },
        { ...wardrobe, count: 1 },
        { ...microWave, count: 1 },
      ];
    case "After party":
      return [
        { ...balcony, count: 5 },
        { ...fridge, count: 1 },
        { ...oven, count: 1 },
        { ...kitchenCabinets, count: 1 },
        { ...microWave, count: 1 },
        { ...dishes, count: 1 },
      ];
    default:
      return [];
  }
};

export const getSubServiceListByMainService = (
  prices: Prices,
  mainService: string,
  mainServicesResponse: MainService[],
  subServicesResponse: SubService[],
  priceMultiplier: number = 1,
  city: string,
) => {
  const selectedMainService = mainServicesResponse.find(
    ({ title }) => title === mainService,
  );

  return subServicesResponse
    .filter(
      ({ disabledCities, isStandalone }) =>
        !disabledCities.includes(city) && !isStandalone,
    )
    .filter(({ mainServices }) =>
      mainServices.includes(selectedMainService!.id),
    )
    .map((subService) => ({
      ...subService,
      originalPrice: prices[subService.key],
      price: getRoundedServicePrice(priceMultiplier * prices[subService.key]),
      oldPrice: priceMultiplier === 1 ? "" : prices[subService.key],
      icons: ALL_SUB_SERVICES.find(({ title }) => title === subService.title)
        ?.icons,
      count: 0
    }));
};

export const showSubServiceSquareMeters = (title: string) =>
  ["Carpet dry cleaning", "Balcony", "Office cleaning"].includes(title);
