const setMskTimeEndForDate = (date: Date) => {
  const newDate = new Date(date);
  newDate.setUTCHours(20, 59, 59, 999);
  return newDate;
};

export function setMskTimeEnd(date: Date): Date;
export function setMskTimeEnd(date: Date[]): Date[];
export function setMskTimeEnd(date: Date[] | Date): Date[] | Date {
  if (date instanceof Array) {
    const dates: Date[] = [];
    date.forEach((date) => {
      const newDate = setMskTimeEndForDate(date);
      dates.push(newDate);
    });
    return dates;
  }

  return setMskTimeEndForDate(date);
}
