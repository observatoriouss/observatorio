import { API_URL } from "@/config/api";

export interface Authority {
  name: string;
  imageUrl: string;
  hierachy: number;
  position: string;
  createdAt: string;
  id: string;
  socialMedia: string[];
}

export const getAuthorities = async (): Promise<Authority[]> => {
  const response = await fetch(`${API_URL}/authorities`);
  return response.json();
};
