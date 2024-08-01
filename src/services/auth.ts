import { PayloadLogin, Session, PayloadRegister, User } from "@/app/store/session.model";
import { api } from "./axios";

// {{url}}/api/auth/login
export async function login(body: PayloadLogin): Promise<Session> {
  const { data } = await api.post<Session>(`/auth/login`, body);
  return data;
}

// {{url}}/api/auth/register
export async function register(body: PayloadRegister) {
  const { data } = await api.post<Session>(`/auth/register`, body);
  return data;
}

// {{url}}/api/auth/authenticate
export async function getUserByToken(token: string): Promise<User> {
  const { data } = await api.get<User>(`/auth/authenticate`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}