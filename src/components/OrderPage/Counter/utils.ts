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
        cost: '5 zl/m2',
        value: 'm2',
        count: 0,
      }, {
        type: 'counter',
        title: 'Ozonation_title_counter_2',
        cost: '40 zl',
        value: 'windows',
        count: 5,
      }];

    case 'Window cleaning':
      return [{
        type: 'counter',
        title: 'Window_cleaning_title_counter',
        cost: '25 zl',
        subtitle: 'Window_cleaning_subtitle_counter',
        value: 'windows',
        count: 5,
        minCount: 5,
      }];

    case 'Post-construction':
      return [{
        type: 'counter',
        title: 'Post_construction_title_counter',
        cost: '7 zl/m2',
        value: 'm2',
        count: 0,
      }];

    default:
      return []
  }
}
