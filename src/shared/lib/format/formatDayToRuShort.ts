const formatterDate = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

const formatterFullDate = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

export const formatTimeToRuShort = (date: Date, withClock = false): string => {
  return !withClock
    ? formatterDate.format(date)
    : formatterFullDate.format(date);
};
