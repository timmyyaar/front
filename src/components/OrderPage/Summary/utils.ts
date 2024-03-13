export const getEstimateFromCounterByService = (mainService: string, counter: any) => {
  switch (mainService) {
    case 'Deep kitchen':
      return 360;

    case 'Subscription':
    case 'Custom cleaning':
      return counter.reduce((acc: number, el: any) => {
        if (el.title === 'custom_cleaning_0_count_total') {
          return acc += el.value * 40;
        } else if (el.title === 'custom_cleaning_1_count_total') {
          return acc += el.value * 45;
        } else if (el.value === 'Kitchen') {
          return acc += 60;
        }

        return acc;
      }, 0);

    case 'While sickness':
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0 && el.value > 1) acc += (el.value - 1) * 60;
        if (i === 1 && el.value > 1) acc += (el.value - 1) * 30;
        if (i === 2 && el.value === 'Kitchen') {
          return acc += 30;
        }

        return acc;
      }, 60);

    case 'Deep':
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0 && el.value > 1) acc += (el.value - 1) * 60;
        if (i === 1 && el.value > 1) acc += (el.value - 1) * 90;

        return acc;
      }, 300);

    case 'Regular':
    case 'Eco cleaning':
    case 'Move in/out':
    case 'Airbnb':
    case 'While sickness':
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0 && el.value !== 1) {
          return acc += (el.value - 1) * 40;
        } else if (i === 1 && el.value !== 1) {
          return acc += (el.value - 1) * 45;
        } else if (el.value === 'Kitchen') {
          return acc += 30;
        }

        return acc;
      }, 150);

    case 'After party':
      return counter.reduce((acc: number, el: any) => {
        if (el.title === 'after_party_0_count_total') {
          return acc += el.value * 60;
        } else if (el.title === 'after_party_1_count_total') {
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

export const getPriceFromCounterByService = (mainService: string, counter: any) => {
  switch (mainService) {
    case 'Deep kitchen':
      return 355;

    case 'Subscription':
    case 'Custom cleaning':
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0 && el.value >= 1) acc += (el.value - 1) * 60;
        if (i === 1 && el.value >= 1) acc += (el.value - 1) * 80;
        if (i === 2) {
          if (el.value === 'Kitchen') {
            acc += 80;
          } else {
            acc += 50;
          }
        }

        return acc;
      }, 190);

    case 'Deep':
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0 && el.value > 1) acc += (el.value - 1) * 60;
        if (i === 1 && el.value > 1) acc += (el.value - 1) * 80;

        return acc;
      }, 499);

    case 'After party':
    case 'In a last minute':
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0 && el.value > 1) acc += ((el.value - 1) * 60);
        if (i === 1 && el.value > 1) acc += ((el.value - 1) * 80);
        if (i === 2) {
          if (el.value === 'Kitchen') {
            acc += 80;
          } else {
            acc += 50;
          }
        }

        return acc;
      }, 320);

    case 'Move in/out':
    case 'Airbnb':
    case 'Regular':
    case 'Eco cleaning':
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0 && el.value > 1) acc += ((el.value - 1) * 40);
        if (i === 1 && el.value > 1) acc += ((el.value - 1) * 45);
        if (i === 2 && el.value === 'Kitchen') acc += 30;

        return acc;
      }, 199);

    case 'Office':
      return counter.reduce((acc: number, el: any, i: number) => {
        acc += el.value * 2.5;
        return acc;
      }, 0);

    case 'Ozonation':
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0) acc += el.value * 7;
        if (i === 1) acc += el.value * 40;

        return acc;
      }, 0);

    case 'Post-construction':
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0) {
          acc += el.value * 50;
        } else if (i === 1) {
          acc += el.value * 6;
        }

        return acc;
      }, 0);

    case 'Dry cleaning':
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0) {
          acc += el.value * 10;
        } else if (i === 1) {
          acc += el.value * 30;
        }

        return acc;
      }, 0);

    case 'Window cleaning':
      return counter.reduce((acc: number, el: any, i: number) => {
        if (i === 0) acc += el.value * 30;
        if (i === 1) acc += el.value * 2.5;

        return acc;
      }, 0);

    default:
      return 0;
  }
}