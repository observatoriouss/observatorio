import { API_URL } from "@/config/api";
import { Category } from "./home";

export async function getNews (): Promise<Post[]> {
    const response = await fetch(`${API_URL}/posts?category=${Category.EduNews}`);
    const data = await response.json();
    return data;
}

export async function getEducatings (): Promise<Post[]> {
    const response = await fetch(`${API_URL}/posts?category=${Category.EduBits}`);
    const data = await response.json();
    return data;
}

export async function getReads (): Promise<Post[]> {
    const response = await fetch(`${API_URL}/posts?category=${Category.EduReads}`);
    const data = await response.json();
    return data;
}

export async function getTubes (): Promise<Post[]> {
    const response = await fetch(`${API_URL}/posts?category=${Category.EduTube}`);
    const data = await response.json();
    return data;
}

export async function getPodcasts (): Promise<Post[]> {
    const response = await fetch(`${API_URL}/posts?category=${Category.Podcast}`);
    const data = await response.json();
    return data;
}

export async function getPostBySlug (slug: string): Promise<Post> {
    const response = await fetch(`${API_URL}/posts/${slug}`);
    const data = await response.json();
    return data;
}

export interface Post {
    title:       string;
    author:      string;
    description: string;
    authorImage: string;
    slug:        string;
    link:        string;
    image:       string;
    imageDescription: string;
    podcast?:    string;
    content:    string | TrustedHTML;
    date:        string;
    readingTime: string;
    category:    Category;
    tags:        string[];
    resource:    string;
    video?:      string;
}
