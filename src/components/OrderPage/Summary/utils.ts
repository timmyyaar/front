export const getEstimateFromCounterByService = (mainService: string, counter: any) => {
  switch (mainService) {
    case 'Custom  cleaning':
      return counter.reduce((acc: number, el: any) => {
        if (el.title === 'regular_0_count_total') {
          return acc += el.value * 40;
        } else if (el.title === 'regular_1_count_total') {
          return acc += el.value * 45;
        } else if (el.value === 'Kitchen') {
          return acc += 60;
        }

        return acc;
      }, 0);

    case 'Regular':
    case 'Eco cleaning':
    case 'Move in/out':
    case 'Airbnb':
    case 'While sickness':
      return counter.reduce((acc: number, el: any) => {
        if (el.title === 'regular_0_count_total') {
          return acc += el.value * 40;
        } else if (el.title === 'regular_1_count_total' && el.value !== 1) {
          return acc += el.value * 45;
        } else if (el.value === 'Kitchen') {
          return acc += 30;
        }

        return acc;
      }, 150);

    case 'After party':
      return counter.reduce((acc: number, el: any) => {
        if (el.title === 'regular_0_count_total') {
          return acc += el.value * 60;
        } else if (el.title === 'regular_1_count_total') {
          return acc += el.value * 45;
        } else if (el.value === 'Kitchen') {
          return acc += 30;
        }

        return acc;
      }, 210);

    case 'Office':
      return counter.reduce((acc: number, el: any) => {
        if (el.value <= 100) {
          return acc += 180;
        } else {
          acc += (el.value - 100) + 180;
        }
        return acc;
      }, 0);

    case 'Ozonation':
      return counter.reduce((acc: number, el: any) => {
        if (el.value > 100) {
          return acc += Math.floor((el.value - 100) / 100) * 60;
        }

        return acc;
      }, 180);

    case 'Post-construction':
      return counter.reduce((acc: number, el: any) => {
        console.log(el);
        if (el.title === 'post-construction_0_count_total') {
          if (el.value < 10) {
            return acc + 10;
          } else {
            return acc + Math.floor(el.value / 10);
          }
        } else if (el.title === 'post-construction_1_count_total') {
          return acc += el.value * 60;
        }

        return acc;
      }, 0);

    case 'Window cleaning':
      return counter.reduce((acc: number, el: any) => {
        if (el.title === 'window_cleaning_0_count_total') {
          return acc + el.value * 30;
        } else if (el.title === 'window_cleaning_1_count_total') {
          return acc + el.value * 2;
        }

        return acc;
      }, 0);

    case 'Dry cleaning':
      return counter.reduce((acc: number, el: any) => {
        if (el.title === 'dry_cleaning_0_count_total') {
          return acc + el.value * 10;
        } else if (el.title === 'dry_cleaning_1_count_total') {
          return acc + el.value * 30;
        }

        return acc;
      }, 0);

    default:
      return 0;
  }
}