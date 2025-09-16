export function getDate(date: string) {
  return date.split("T")[0];
}

export function getTime(date: string) {
  return date.slice(11, 16);
}

export function getDayName(date: Date | string): string {
  const day = new Date(date);
  return day.toLocaleDateString("en-US", { weekday: "long" });
}

export function getCurrentWeekDates() {
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
  const dayIndex = (today.getDay() + 6) % 7; // Monday=0 ... Sunday=6

  // Get Monday of the current week
  const monday = new Date(today);
  monday.setDate(today.getDate() - dayIndex);

  return daysOfWeek.map((day, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);

    return {
      name: day,
      date: getDate(d.toISOString()),
    };
  });
}
