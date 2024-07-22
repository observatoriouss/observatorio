import { API_URL } from "@/config/api";
import { Post, User } from "./posts";

// {{url}}/api/users/ing-renatto-perleche-2
export const getAuthorBySlug = async (slug: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${slug}`);
  return response.json();
};

// {{url}}/api/users/:id/posts
export const getAuthorPosts = async (id: string): Promise<Post[]> => {
  const response = await fetch(`${API_URL}/users/${id}/posts`);
  return response.json();
};