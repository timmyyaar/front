export const getCheckBoxByMainService = (mainService: string) => {
  switch (mainService) {
    case "Custom cleaning":
    case "Subscription":
    case "After party":
    case "Airbnb":
    case "Deep kitchen":
    case "Move in/out":
    case "Eco cleaning":
    case "Regular":
    case "Deep":
      return ["vacuum cleaner", "own supplies"];

    case "Office":
      return ["vacuum cleaner", "own check list"];

    // case 'Dry cleaning':
    //   return ['dry', 'own supplies'];

    case "Post-construction":
    case "Window cleaning":
    case "While sickness":
      return ["own supplies"];

    default:
      return [];
  }
};
