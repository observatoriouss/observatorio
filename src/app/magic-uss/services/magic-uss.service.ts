import { api } from "@/services/axios";
import { Conversation, Message } from "../models/magic-uss.model";
import { getCookie } from "cookies-next";
import { API_URL_STREAMS } from "@/config/api";

interface PayloadCreateConversation {
  userId: string;
  body: string;
}
export class MagicUssService {
  static getConversations = async (): Promise<Conversation[]> => {
    const { data } = await api.get<Conversation[]>("/conversations", {
      headers: {
        Authorization: `Bearer ${getCookie("TOKEN")}`,
      },
    });
    return data;
  };

  static getMessages = async (conversationId: string): Promise<Message[]> => {
    const { data } = await api.get<Message[]>(
      `/conversations/${conversationId}/messages`,
      {
        headers: {
          Authorization: `Bearer ${getCookie("TOKEN")}`,
        },
      }
    );
    return data;
  };

  // Streams
  static baseURLStream = API_URL_STREAMS;

  static createConversation = async (payload: PayloadCreateConversation) => {
    return new EventSource(
      `${this.baseURLStream}/conversations?userId=${payload.userId}&body=${payload.body}`
    );
  };

  static createMessage = (
    conversationId: string,
    body: string
  ): EventSource => {
    return new EventSource(
      `${this.baseURLStream}/conversations/${conversationId}/messages?body=${body}`
    );
  };

  static ask = async (postId: string, question: string) => {
    return new EventSource(
      `${this.baseURLStream}/posts/${postId}/ask?question=${question}`
    );
  };
}
