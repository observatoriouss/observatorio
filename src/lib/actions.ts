"use server";

import { API_URL } from "@/config/api";
// import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getIsLikeToPost(id: string) {
  const cookiesStore = cookies();
  const isLike = cookiesStore.has(id)
    ? cookiesStore.get(id)?.value === "on"
    : false;
  return isLike;
}

export async function setLikesToPost({id}: {id: string}) {
  const cookiesStore = cookies();
  const hasCookie = cookiesStore.has(id);
  if (!hasCookie) {
    const likes = await updateLikes({ id, action: "increment" });
    cookiesStore.set({
      name: id,
      value: "on",
      httpOnly: true,
      path: "/",
    });
    return {likes};
  }

  if (cookiesStore.get(id)!.value === "on") {
    const likes = await updateLikes({ id, action: "decrement" });
    cookiesStore.set({
      name: id,
      value: "off",
      httpOnly: true,
      path: "/",
    });
    return {likes};

  } else {
    const likes = await updateLikes({ id, action: "increment" });
    cookiesStore.set({
      name: id,
      value: "on",
      httpOnly: true,
      path: "/",
    });
    return {likes};
  }
}

export async function updateLikes({id, action}: {id: string, action: "increment" | "decrement"}){
  return fetch(
    `${API_URL}/posts/${id}/likes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action }),
    }
  ).then((res) => res.json());
}
