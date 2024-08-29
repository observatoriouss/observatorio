import { PayloadLogin, Session, PayloadRegister, User, UserBodyRequest } from "@/app/store/session.model";
import { api } from "./axios";
import { CookieValueTypes } from "cookies-next";

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

// update user
// {{url}}/api/users/ef76314f-38fb-4367-ab26-30a3147149dd
export async function updateUser(body: UserBodyRequest, id: string, tokenBearerAuthorize: CookieValueTypes): Promise<User> {
  const { data } = await api.put<User>(`/users/${id}`, body, {
    headers: {
      Authorization: `Bearer ${tokenBearerAuthorize}`,
    },
  });
  return data;
}