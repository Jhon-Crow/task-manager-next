export function addDays(days: number, date = new Date()): Date {
  const result = new Date(date);

  result.setDate(result.getDate() + days);
  result.setHours(23, 59, 59, 0);

  return result;
}
