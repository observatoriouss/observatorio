import { API_URL } from "@/config/api";
import { api } from "@/services/axios";
import { RequestPost } from "../store/steps.store";

export interface Guest {
  name: string;
  email: string;
  documentType: string;
  documentNumber: string;
  isApproved: boolean;
  createdAt: Date;
  id: string;
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
  guest: Partial<Guest>
): Promise<Guest> {
  const { data } = await api.put<Guest>(`${API_URL}/guests/${id}`, guest);
  return data;
}

// {{url}}/api/guests create
export async function createGuest(guest: Partial<Guest>): Promise<Guest> {
  const { data } = await api.post<Guest>(`${API_URL}/guests`, guest);
  return data;
}

// {{url}}/api/common/send-otp
export async function sendOTP(email: string): Promise<void> {
  await api.post(`${API_URL}/common/send-otp`, { email });
}

// {{url}}/api/common/verify-otp
export async function verifyOTP(email: string, otp: string): Promise<void> {
  //   await api.post(`${API_URL}/common/verify-otp`, { email, otp });
  // simular respuesta
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

// {{url}}/api/posts/create-request
export async function createRequestPost(request: RequestPost): Promise<RequestPost> {
  const { data } = await api.post(`${API_URL}/posts/create-request`, request);
  return data
}

// {{url}}/api/storage/upload
export async function uploadFile(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post<{ url: string }>(`${API_URL}/storage/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}