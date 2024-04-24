import { API_URL } from "@/config/api";
import { Category } from "./home";
import { cache } from "react";

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

export const getReactCachedPost = cache(async (slug: string) => {
  const startDate = new Date()
  const res = await getPostBySlug(slug)
  const endDate = new Date()
  console.log('Time to fetch data', endDate.getTime() - startDate.getTime())
  return res
});

export interface Post {
  id: string;
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
  userId?: string;
  user: User;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  reference?: Reference;
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

export interface Reference {
  author: string;
  url: string;
}
