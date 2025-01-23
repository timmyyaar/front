export const getAdditionalServices = (mainService: string) => {
  switch (mainService) {
    case "Eco cleaning":
    case "Post-construction":
    case "Office":
      return "ADD OZONATION SERVICE";

    case "Move in/out":
    case "Regular":
    case "After party":
    case "Deep":
    case "Airbnb":
      return "ADD DRY CLEANING OF FURNITURE AND CARPETS";

    default:
      return "";
  }
};
