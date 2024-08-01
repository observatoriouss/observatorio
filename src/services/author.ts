import { API_URL } from "@/config/api";
import { Post, User } from "./posts";

export const getAuthorBySlug = async (slug: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${slug}`);
  return response.json();
};

export const getAuthorPosts = async (id: string): Promise<Post[]> => {
  const response = await fetch(`${API_URL}/posts?userId=${id}`);
  return response.json();
};