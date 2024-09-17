import {
  Comment,
  LikeCommentResponse,
  PayloadComment,
} from "@/stores/post";
import { api } from "./axios";
import { getCookie } from "cookies-next";
// {{url}}/api/posts/:id/comments
export const getCommentsForPost = async (
  postId: string
): Promise<Comment[]> => {
  const { data } = await api.get<Comment[]>(`/posts/${postId}/comments`);
  return data;
};

// {{url}}/api/posts/:postId/comments/:postCommentId/likes
export const likeComment = async (
  postId: string,
  postCommentId: string
): Promise<LikeCommentResponse> => {
  const { data } = await api.post(
    `/posts/${postId}/comments/${postCommentId}/likes`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${getCookie("TOKEN")}`,
      },
    }
  );
  return data;
};

// {{url}}/api/posts/:id/comments
export const createComment = async (
  postId: string,
  body: PayloadComment
): Promise<Comment> => {
  const { data } = await api.post<Comment>(`/posts/${postId}/comments`, body, {
    headers: {
      Authorization: `Bearer ${getCookie("TOKEN")}`,
    },
  });
  return data;
};

// {{url}}/api/posts/:postId/comments/:postCommentId
export const deleteComment = async (
  postId: string,
  postCommentId: string
): Promise<void> => {
  await api.delete(`/posts/${postId}/comments/${postCommentId}`);
};
