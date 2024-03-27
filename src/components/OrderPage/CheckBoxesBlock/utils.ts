export const getCheckBoxByMainService = (mainService: string) => {
  console.log(mainService);
  switch (mainService) {
    case "Custom cleaning":
    case "Subscription":
    case "After party":
    case "In a last minute":
    case "Airbnb":
    case "Deep kitchen":
    case "Move in/out":
    case "Eco cleaning":
    case "Regular":
    case "Deep":
      return ["vacuum cleaner", "own supplies"];

    case "Office":
      return ["vacuum cleaner"];

    // case "Dry cleaning":
    //   return ["dry"];

    case "Post-construction":
    case "Window cleaning":
    case "While sickness":
      return ["own supplies"];

    default:
      return [];
  }
};
