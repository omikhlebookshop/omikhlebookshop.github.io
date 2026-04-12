/**
 * Convert date from numbers to Date object. Month is zero indexed during the initialization.
 */
const toDate = (year: number, month: number, day: number = 1): Date =>
  new Date(year, month - 1, day);

export { toDate };
