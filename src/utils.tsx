/* eslint-disable @typescript-eslint/explicit-function-return-type */
export function getCurrentDateTime () {
  return new Date().toLocaleString('en-us', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}
