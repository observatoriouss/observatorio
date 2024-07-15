import { DateTime } from "luxon";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatDate(date: string) {
  return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED);
}

// date only día y mes: 17 JUN
export function formatDateShort(date: string) {
  return DateTime.fromISO(date).toFormat("dd MMM");
}

// date only hour: 17:00
export function formatHour(date: string) {
  return DateTime.fromISO(date).toFormat("HH:mm");
}

export function getDuration(from: string, to: string): string {
  const start = DateTime.fromISO(from);
  const end = DateTime.fromISO(to);
  const diff = end.diff(start, ["hours", "minutes", "seconds"]).toObject();
  return `${diff.hours}h ${diff.minutes}m`;
}

export function transformSecondsToMinutes(seconds: number) {
  return Math.floor(seconds / 60) + "m " + (seconds % 60) + "s";
}

export function formatDateLong(date: string) {
  return DateTime.fromISO(date, { locale: "es" }).toFormat(
    "dd 'de' MMMM 'del' yyyy"
  );
}

// export function formatDateTimeRange(from: string, to: string) {
//   return `${formatDateLong(from)}, ${formatHour(from)} - ${formatHour(to)}`;
// }
export function formatDateTimeRange(from: string, to: string) {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const date = formatDateLong(from);

  const time = `${formatHour(from)} - ${formatHour(to)}`;

  return { date, time };
}

export function getYoutubeId(url: string): string | null {
  // Verificar si la URL es válida
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);

  // Si hay coincidencias, retornar el ID
  if (match) {
    return match[1];
  } else {
    return null; // URL no válida o no se encontró el ID
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
