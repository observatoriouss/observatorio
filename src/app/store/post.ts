import { Post } from "@/services/posts";
import { toast } from "sonner";
import { create } from "zustand";
import { Comment, PayloadComment } from "./post.model";
import { CommentErrorCode } from "@/lib/error-codes";
import { AxiosError } from "axios";
import { ErrorType } from "@/lib/types";
import {
  createComment,
  getCommentsForPost,
  likeComment,
  deleteComment,
} from "@/services/comments";

type State = {
  commentTerm: string;
  postSelected: Post | null;
  postSelectedDraft: Post | null;
  commentsForPost: Comment[];
  commentsForPostDraft: Comment[];
  isOpenComments: boolean;
  isLoadingComments: boolean;
  isDialogDeleteCommentOpen: boolean;
  isDialogDeleteCommentLoading: boolean;
  isCreateCommentLoading: boolean;
  isLikeCommentLoading: boolean;
};

type Actions = {
  setCommentTerm: (commentTerm: string) => void;
  setPostSelected: (post: Post | null) => void;
  getCommentsForPost: (postId: string) => Promise<void>;
  setIsOpenComments: (isOpenComments: boolean) => void;
  setIsDialogDeleteCommentOpen: (isDialogDeleteCommentOpen: boolean) => void;
  createComment: (body: PayloadComment) => Promise<void>;
  likeComment: (postCommentId: string) => Promise<void>;
  deleteComment: (postCommentId: string) => Promise<void>;
};

export const PostStore = create<State & Actions>((set) => ({
  commentTerm: "",
  postSelected: null,
  postSelectedDraft: null,
  commentsForPost: [],
  commentsForPostDraft: [],
  isOpenComments: false,
  isLoadingComments: false,
  isDialogDeleteCommentOpen: false,
  isDialogDeleteCommentLoading: false,
  isCreateCommentLoading: false,
  isLikeCommentLoading: false,
  setCommentTerm: (commentTerm) => set({ commentTerm }),
  setPostSelected: (postSelected) =>
    set({ postSelected, postSelectedDraft: postSelected }),
  getCommentsForPost: async (postId) => {
    set({ isLoadingComments: true });
    try {
      const commentsForPost = await getCommentsForPost(postId);
      set({ commentsForPost, commentsForPostDraft: commentsForPost });
    } catch (error) {
      const code = ((error as AxiosError)?.response?.data as ErrorType)
        ?.code as keyof typeof CommentErrorCode;
      toast.error(
        CommentErrorCode[code] ??
          "Ocurrió un error inesperado, intente nuevamente"
      );
    } finally {
      set({ isLoadingComments: false });
    }
  },
  setIsOpenComments: (isOpenComments) => set({ isOpenComments }),
  setIsDialogDeleteCommentOpen: (isDialogDeleteCommentOpen) =>
    set({ isDialogDeleteCommentOpen }),
  createComment: async (body) => {
    const post = PostStore.getState().postSelected;
    const commentsForPost = PostStore.getState().commentsForPost;
    if (!post) {
      toast.error("No se ha seleccionado un post");
      return;
    }
    set({ isCreateCommentLoading: true });
    try {
      const newComment = await createComment(post.id, body);
      if (body.parentId) {
        const newCommentsForPost = commentsForPost.map((comment) => {
          if (comment.id === body.parentId) {
            return {
              ...comment,
              children: [
                ...comment.children,
                newComment,
              ],
            };
          }
          return comment;
        });
        set({
          commentsForPost: newCommentsForPost,
          commentsForPostDraft: newCommentsForPost,
        });
      } else {
        set({
          commentsForPost: [
            newComment,
            ...commentsForPost,
          ],
          commentsForPostDraft: [
            newComment,
            ...commentsForPost,
          ],
          commentTerm: "",
        });
      }
      set({ postSelected: { ...post, numberOfComments: (post.numberOfComments ?? 0) + 1 } });
      set({ postSelectedDraft: { ...post, numberOfComments: (post.numberOfComments ?? 0) + 1 } });

    } catch (error) {
      const code = ((error as AxiosError)?.response?.data as ErrorType)
        ?.code as keyof typeof CommentErrorCode;
      toast.error(
        CommentErrorCode[code] ??
          "Ocurrió un error inesperado, intente nuevamente"
      );
      return;
    } finally {
      set({ isCreateCommentLoading: false });
    }
  },
  likeComment: async (postCommentId) => {
    const post = PostStore.getState().postSelected;
    const commentsForPost = PostStore.getState().commentsForPost;
    if (!post) {
      toast.error("No se ha seleccionado un post");
      return;
    }
    set({ isLikeCommentLoading: true });
    try {
      const { iLikedIt, numberOfLikes } = await likeComment(
        post.id,
        postCommentId
      );
      const newCommentsForPost = commentsForPost.map((comment) => {
        if (comment.id === postCommentId) {
          return { ...comment, iLikedIt, numberOfLikes };
        }
        for (let i = 0; i < comment.children.length; i++) {
          if (comment.children[i].id === postCommentId) {
            comment.children[i].iLikedIt = iLikedIt;
            comment.children[i].numberOfLikes = numberOfLikes;
            break;
          }
        }
        return comment;
      });
      set({
        commentsForPost: newCommentsForPost,
        commentsForPostDraft: newCommentsForPost,
      });
    } catch (error) {
      toast.error("Ocurrió un error inesperado, intente nuevamente");
    } finally {
      set({ isLikeCommentLoading: false });
    }
  },
  deleteComment: async (postCommentId) => {
    const post = PostStore.getState().postSelected;
    const commentsForPost = PostStore.getState().commentsForPost;
    if (!post) {
      toast.error("No se ha seleccionado un post");
      return;
    }
    set({ isDialogDeleteCommentLoading: true });
    try {
      await deleteComment(post.id, postCommentId);
      const newCommentsForPost = commentsForPost.filter(
        (comment) => comment.id !== postCommentId
      );
      set({
        commentsForPost: newCommentsForPost,
        commentsForPostDraft: newCommentsForPost,
      });
    } catch (error) {
      toast.error("Ocurrió un error inesperado, intente nuevamente");
    } finally {
      set({ isDialogDeleteCommentLoading: false });
    }
  },
}));
