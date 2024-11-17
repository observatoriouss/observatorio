import { API_URL } from "@/config/api";
import { Post } from "./posts";
import { User } from "@/stores/session";

export interface Author extends User {
  postsCount: number;
  postLikes: number;
  biography?: any;
}
export const getAuthorBySlug = async (slug: string): Promise<Author> => {
  const response = await fetch(`${API_URL}/users/${slug}`);
  return response.json();
};

export const getAuthorPosts = async (id: string): Promise<Post[]> => {
  const response = await fetch(`${API_URL}/posts?userId=${id}`);
  return response.json();
};