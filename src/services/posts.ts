import { API_URL } from "@/config/api";
import { Category } from "./home";

export async function getNews(): Promise<Post[]> {
  const response = await fetch(`${API_URL}/posts?category=${Category.NEWS}`);
  const data = await response.json();
  return data;
}

export async function getEducatings(): Promise<Post[]> {
  const response = await fetch(`${API_URL}/posts?category=${Category.BITS}`);
  const data = await response.json();
  return data;
}

export async function getReads(): Promise<Post[]> {
  const response = await fetch(`${API_URL}/posts?category=${Category.READS}`);
  const data = await response.json();
  return data;
}

export async function getTubes(): Promise<Post[]> {
  const response = await fetch(`${API_URL}/posts?category=${Category.TUBES}`);
  const data = await response.json();
  return data;
}

export async function getPodcasts(): Promise<Post[]> {
  const response = await fetch(`${API_URL}/posts?category=${Category.PODCAST}`);
  const data = await response.json();
  return data;
}

export async function getEditorials(): Promise<Post[]> {
  const response = await fetch(`${API_URL}/posts?category=${Category.EDITORIAL}`);
  const data = await response.json();
  return data;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const response = await fetch(`${API_URL}/posts/${slug}`);
  const data = await response.json();
  return data;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  category: Category;
  subCategory: null;
  readingTime: number;
  description: null | string;
  content?: string | TrustedHTML;
  videoUrl: null | string;
  podcastUrl: null | string;
  imageUrl: null | string;
  imageDescription: null | string;
  likes: number;
  userId: number;
  user: User;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}
export interface User {
  id:       number;
  name:     string;
  email:    string;
  role:     string;
  image:    null | string;
  isActive: boolean;
}
export interface Tag {
  id: number;
  name: string;
}
