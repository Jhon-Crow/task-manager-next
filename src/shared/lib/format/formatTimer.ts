const pluralizeDays = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) return "день";
  if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return "дня";
  }
  return "дней";
};

export const formatTimer = (ms: number): null | string => {
  if (ms <= 0) return null;

  const sec = Math.floor(ms / 1000);
  const min = Math.floor(sec / 60);
  const hours = Math.floor(min / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days} ${pluralizeDays(days)}`;
  return [
    (hours % 24).toString().padStart(2, "0"),
    (min % 60).toString().padStart(2, "0"),
    (sec % 60).toString().padStart(2, "0"),
  ].join(":");
};
