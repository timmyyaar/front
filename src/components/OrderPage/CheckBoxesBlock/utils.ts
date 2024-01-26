export const getCheckBoxByMainService = (mainService: string) => {
  switch (mainService) {
    case 'Custom cleaning':
    case 'After party':
    case 'In a last minute':
    case 'Airbnb':
    case 'Deep kitchen':
    case 'Move in/out':
    case 'Eco cleaning':
    case 'Regular':
    case 'Deep':
      return ['vacuum cleaner', 'keys'];

    case 'Office':
      return ['vacuum cleaner'];

    case 'Dry cleaning':
    case 'Post-construction':
    case 'Ozonation':
      return ['keys'];

    default:
      return []
  }
}
