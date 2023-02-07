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

export const People = [
  { team_id: 1, name: 'M', steps: 4900 },
  { team_id: 4, name: 'K', steps: 5420 },
  { team_id: 3, name: 'B', steps: 6800 },
  { team_id: 4, name: 'A', steps: 1000 },
  { team_id: 1, name: 'C', steps: 600 },
  { team_id: 4, name: 'D', steps: 5000 },
  { team_id: 3, name: 'E', steps: 800 },
  { team_id: 4, name: 'F', steps: 5000 },
  { team_id: 1, name: 'G', steps: 4000 },
  { team_id: 4, name: 'H', steps: 3020 },
  { team_id: 3, name: 'I', steps: 2800 },
  { team_id: 4, name: 'J', steps: 2900 },
  { team_id: 1, name: 'K', steps: 1600 },
  { team_id: 4, name: 'L', steps: 420 },
  { team_id: 3, name: 'Mn', steps: 7800 },
  { team_id: 4, name: 'N', steps: 1900 },
  { team_id: 1, name: 'O', steps: 4900 },
  { team_id: 4, name: 'P', steps: 5420 },
  { team_id: 3, name: 'Q', steps: 6800 },
  { team_id: 4, name: 'R', steps: 1000 },
  { team_id: 1, name: 'S', steps: 600 },
  { team_id: 4, name: 'T', steps: 8020 },
  { team_id: 3, name: 'U', steps: 800 },
  { team_id: 4, name: 'V', steps: 5000 },
  { team_id: 1, name: 'Y', steps: 4000 },
  { team_id: 4, name: 'X', steps: 3020 },
  { team_id: 3, name: 'Z', steps: 2800 },
  { team_id: 4, name: 'Al', steps: 2900 },
  { team_id: 1, name: 'Mi', steps: 1600 },
  { team_id: 4, name: 'Ke', steps: 420 },
  { team_id: 3, name: 'Ba', steps: 7800 },
  { team_id: 4, name: 'Ali', steps: 1900 },
  { team_id: 1, name: 'Mic', steps: 4900 },
  { team_id: 4, name: 'Kev', steps: 5420 },
  { team_id: 3, name: 'Bai', steps: 6800 },
  { team_id: 4, name: 'Alis', steps: 1000 },
  { team_id: 1, name: 'Mich', steps: 600 },
  { team_id: 4, name: 'Kevi', steps: 8020 },
  { team_id: 3, name: 'Bail', steps: 800 },
  { team_id: 4, name: 'Aliss', steps: 5000 },
  { team_id: 1, name: 'Micha', steps: 4000 },
  { team_id: 4, name: 'Kevin', steps: 3020 },
  { team_id: 3, name: 'Baile', steps: 2800 },
  { team_id: 4, name: 'Alissa', steps: 2900 },
  { team_id: 1, name: 'Michae', steps: 1600 },
  { team_id: 4, name: 'Kevina', steps: 420 },
  { team_id: 3, name: 'Bailee', steps: 7800 },
  { team_id: 4, name: 'Alissaa', steps: 1900 },
  { team_id: 1, name: 'Michael', steps: 4900 },
  { team_id: 4, name: 'Kevinsa', steps: 5420 },
  { team_id: 3, name: 'Baileeds', steps: 6800 },
  { team_id: 4, name: 'Alissadsd', steps: 1000 },
  { team_id: 1, name: 'Michael sdsds', steps: 600 },
  { team_id: 4, name: 'Kevins dsd', steps: 8020 },
  { team_id: 3, name: 'Bailee ff', steps: 800 },
  { team_id: 4, name: 'Alissa tttdfs', steps: 5000 },
  { team_id: 1, name: 'Michael asda', steps: 4000 },
  { team_id: 4, name: 'Kevin cz', steps: 3020 },
  { team_id: 3, name: 'Bailee gree', steps: 2800 },
  { team_id: 4, name: 'Alissa cvcxe', steps: 2900 },
  { team_id: 1, name: 'Michael', steps: 1600 },
  { team_id: 4, name: 'Kevin', steps: 420 },
  { team_id: 3, name: 'Bailee', steps: 7800 },
  { team_id: 4, name: 'Alissa', steps: 1900 }
];

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
