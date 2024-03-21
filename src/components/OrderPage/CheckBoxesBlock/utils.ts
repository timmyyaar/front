export const getCheckBoxByMainService = (mainService: string) => {
  switch (mainService) {
    case 'Custom cleaning':
    case 'Subscription':
    case 'After party':
    case 'In a last minute':
    case 'Airbnb':
    case 'Deep kitchen':
    case 'Move in/out':
    case 'Eco cleaning':
    case 'Regular':
    case 'Deep':
      return ['vacuum cleaner', 'own supplies'];

    case 'Office':
      return ['vacuum cleaner'];

    case 'Dry cleaning':
      return ['dry', 'own supplies'];

    case 'Post-construction':
    case 'Ozonation':
      return ['own supplies'];

    default:
      return []
  }
}
