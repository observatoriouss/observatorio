import { API_URL } from "@/config/api";
import { api } from "@/services/axios";
import { RequestPost } from "../store/steps.store";
import { getCookie } from "cookies-next";

export interface Guest {
  name: string;
  email: string;
  documentType: string;
  documentNumber: string;
  isApproved: boolean;
  createdAt: Date;
  id: string;
}

export interface PayloadGuest extends Partial<Guest> {
  verificationCode: string;
}

export async function getGuest(
  documentType: string,
  documentNumber: string
): Promise<Guest> {
  const { data } = await api.get<Guest>(
    `${API_URL}/guests/${documentType}/${documentNumber}`
  );
  return data;
}

// {{url}}/api/guests/:id update
export async function updateGuest(
  id: string,
  guest: PayloadGuest
): Promise<Guest> {
  const { data } = await api.put<Guest>(`${API_URL}/guests/${id}`, guest);
  return data;
}

// {{url}}/api/guests create
export async function createGuest(guest: PayloadGuest): Promise<Guest> {
  const { data } = await api.post<Guest>(`${API_URL}/guests`, guest);
  return data;
}

// {{url}}/api/common/send-otp
export async function sendOTP(email: string): Promise<void> {
  await api.post(`${API_URL}/common/send-otp`, { email });
}

// {{url}}/api/posts/create-request
export async function createRequestPost(
  request: RequestPost
): Promise<RequestPost> {
  const { data } = await api.post(`${API_URL}/posts/create-request`, request, {
    headers: {
      Authorization: `Bearer ${getCookie("TOKEN")}`,
    },
  });
  return data;
}

// {{url}}/api/storage/upload
export async function uploadFile(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post<{ url: string }>(
    `${API_URL}/storage/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}
