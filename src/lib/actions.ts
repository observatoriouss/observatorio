"use server";

import { API_URL } from "@/config/api";
// import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getIsLikeToPost(slug: string) {
  const cookiesStore = cookies();
  const isLike = cookiesStore.has(slug)
    ? cookiesStore.get(slug)?.value === "on"
    : false;
  return isLike;
}

export async function setLikesToPost(slug: string) {
  const cookiesStore = cookies();
  const hasCookie = cookiesStore.has(slug);
  if (!hasCookie) {
    const likes = await fetch(
      `${API_URL}/posts/${slug}/likes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "increment" }),
      }
    );
    const number = await likes.json();
    cookiesStore.set({
      name: slug,
      value: "on",
      httpOnly: true,
      path: "/",
    });
    return { likes: number };
  }

  if (hasCookie) {
    if (cookiesStore.get(slug)?.value === "on") {
      const likes = await fetch(
        `${API_URL}/posts/${slug}/likes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "decrement" }),
        }
      );
      const number = await likes.json();
      cookiesStore.set({
        name: slug,
        value: "off",
        httpOnly: true,
        path: "/",
      });
      return { likes: number };
    } else {
      const likes = await fetch(
        `${API_URL}/posts/${slug}/likes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "increment" }),
        }
      );
      const number = await likes.json();
      cookiesStore.set({
        name: slug,
        value: "on",
        httpOnly: true,
        path: "/",
      });
      return { likes: number };
    }
  }

  // TODO: aplicar revalidatePath a la ruta actual
  // revalidatePath(``)

  return { likes: 0 };
}
