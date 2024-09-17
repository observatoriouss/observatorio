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
  const res = await getPostBySlug(slug)
  return res
});

// getAudio
// {{url}}/api/posts/:id/audio
export interface ContentAudio {
  contentAudioUrl: string;
}

export async function getAudio(id: string): Promise<ContentAudio> {
  const response = await fetch(`${API_URL}/posts/${id}/audio`);
  const data = await response.json();
  return data;
}

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
  numberOfComments?: number;
  contentAudioUrl?: string;
  userId?: string;
  user: User;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  reference?: Reference;
}
export interface User {
  id:       string;
  slug:     string;
  name:     string;
  email:    string;
  role:     string;
  image:    null | string;
  isActive: boolean;
  country: Country;
}
export interface Country {
  name: string;
  code: string;
  icon: string;
}
export interface Tag {
  id: number;
  name: string;
}

export interface Reference {
  author: string;
  url: string;
}
