import { PRIVATE_HOUSE_SERVICES } from "@/components/OrderPage/constants";

export const getCounterByMainService = (mainService: string) => {
  switch (mainService) {
    case "In a last minute":
    case "After party":
    case "Airbnb":
    case "While sickness":
    case "Move in/out":
    case "Eco cleaning":
    case "Regular":
    case "Deep":
    case "Subscription":
      return [
        {
          type: "counter",
          value: "bedroom",
          count: 1,
        },
        {
          type: "counter",
          value: "bathroom",
          count: 1,
        },
        {
          type: "switcher",
          values: ["Kitchenette", "Kitchen"],
          count: "Kitchenette",
        },
      ];

    case "Office":
      return [
        {
          type: "counter",
          title: "Office_title_counter",
          cost: "2.50 zl/m2",
          value: "m2",
          count: 0,
        },
      ];

    case "Ozonation":
      return [
        {
          type: "counter",
          title: "Ozonation_title_counter",
          cost: "7 zl",
          value: "m2",
          count: 0,
        },
      ];

    case "Window cleaning":
      return [
        {
          type: "counter",
          title: "window_cleaning_title_counter",
          cost: "30 zl",
          value: "windows",
          count: 5,
          minCount: 5,
        },
        {
          type: "counter",
          title: "window_cleaning_title_counter_2",
          cost: "2.5 zl/m2",
          value: "m2",
          count: 0,
          minCount: 0,
        },
      ];

    case "Post-construction":
      return [
        {
          type: "counter",
          title: "post_construction_title_counter",
          cost: "50 zl",
          value: "windows",
          count: 0,
        },
        {
          type: "counter",
          title: "post_construction_title_counter_2",
          cost: "6 zl/m2",
          value: "m2",
          count: 0,
        },
      ];

    default:
      return [];
  }
};

export const getIsPrivateHouse = (mainService: string) =>
  PRIVATE_HOUSE_SERVICES.includes(mainService);
