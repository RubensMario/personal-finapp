const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MONTHS_NAME = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
];
const YEARS = [2019, 2020, 2021];
const PERIODS = [];

let indexId = 0;

YEARS.forEach((year) => {
  let monthIndex = 0;
  MONTHS.forEach((month) => {
    PERIODS.push({
      id: ++indexId,
      date: `${year}-${month.toString().padStart(2, '0')}`,
      name: `${MONTHS_NAME[++monthIndex - 1]}/${year}`,
    });
  });
});

export default PERIODS;
