export const getCounterByMainService = (mainService: string) => {
  switch (mainService) {
    case 'In a last minute':
    case 'After party':
    case 'Custom cleaning':
    case 'Airbnb':
    case 'While sickness':
    case 'Move in/out':
    case 'Eco cleaning':
    case 'Regular':
    case 'Deep':
      return [{
        type: 'counter',
        value: 'bedroom',
        count: 1,
      }, {
        type: 'counter',
        value: 'bathroom',
        count: 1,
      }, {
        type: 'switcher',
        values: ['Kitchenette', 'Kitchen'],
        count: 'Kitchenette',
      }];

    case 'Office':
      return [{
        type: 'counter',
        title: 'Office_title_counter',
        cost: '2.50 zl/m2',
        value: 'm2',
        count: 0,
      }];

    case 'Ozonation':
      return [{
        type: 'counter',
        title: 'Ozonation_title_counter',
        cost: '7 zl',
        value: 'm2',
        count: 0,
      }];

    case 'Window cleaning':
      return [{
        type: 'counter',
        title: 'window_cleaning_title_counter',
        cost: '25 zl',
        value: 'windows',
        count: 0,
      }, {
        type: 'counter',
        title: 'window_cleaning_title_counter_2',
        cost: '3 zl/m2',
        value: 'windows',
        count: 5,
      }];

    case 'Post-construction':
      return [{
        type: 'counter',
        title: 'window_cleaning_title_counter',
        cost: '25 zl',
        value: 'windows',
        count: 5,
      }, {
        type: 'counter',
        title: 'window_cleaning_title_counter_2',
        cost: '3 zl/m2',
        value: 'm2',
        count: 0,
      }];

    case 'Dry cleaning':
      return [{
        type: 'counter',
        title: 'dry_cleaning_title_counter',
        cost: '10 zl/m2',
        value: 'm2',
        count: 0,
      }, {
        type: 'counter',
        value: '-seater sofa',
        count: 0,
      }];

    default:
      return []
  }
}
