import { DateTime } from "luxon";
export function formatDate(date: string) {
  return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED);
}

export function transformSecondsToMinutes(seconds: number) {
  return Math.floor(seconds / 60) + "m " + (seconds % 60) + "s";
}

export function getYoutubeId(url: string): string | null {
  // Verificar si la URL es válida
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);

  // Si hay coincidencias, retornar el ID
  console.log({match})
  if (match) {
    return match[1];
  } else {
    return null; // URL no válida o no se encontró el ID
  }
}
