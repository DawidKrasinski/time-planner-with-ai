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

export function getLastWeekDates() {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const today = new Date();
  const dayIndex = (today.getDay() + 6) % 7; // Sunday=0 Monday=1 ... Saturday=6

  return daysOfWeek.map((day, i) => {
    const diff = (dayIndex - i + 7) % 7 || 7; // ensure "last" even if today
    const d = new Date(today);
    d.setDate(today.getDate() - diff);

    return {
      name: day,
      date: getDate(d), // YYYY-MM-DD
    };
  });
}
