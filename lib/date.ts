export function getDate(date: Date = new Date()) {
  return date.toString().split("T")[0];
}

export function getTime(date: Date = new Date()) {
  return date.toString().slice(11, 16);
}

export function getDayName(date: Date | string): string {
  const day = new Date(date);
  return day.toLocaleDateString("en-US", { weekday: "long" });
}
