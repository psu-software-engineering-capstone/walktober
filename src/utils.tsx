/* eslint-disable @typescript-eslint/explicit-function-return-type */
export function getCurrentDateTime() {
  return new Date().toLocaleString('en-us', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function ChartDummyData() {
  return [
    {
      day: 'monday',
      steps: 100
    },
    {
      day: 'tuesday',
      steps: 85
    },
    {
      day: 'thrsday',
      steps: 92
    },
    {
      day: 'friday',
      steps: 67
    },
    {
      day: 'saturday',
      steps: 10
    },
    {
      day: 'sunday',
      steps: 15
    }
  ];
}
