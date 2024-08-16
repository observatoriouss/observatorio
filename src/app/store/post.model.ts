import { User } from "./session.model";

export interface Comment {
    body:          string;
    parentId:      null | string;
    postId:        string;
    userId:        string;
    createdAt:     string;
    id:            string;
    children:      Comment[];
    user:          User;
    iLikedIt:      boolean;
    numberOfLikes: number;
}

export interface LikeCommentResponse {
    iLikedIt:      boolean;
    numberOfLikes: number;
}

export interface PayloadComment {
    body:     string;
    // null or CommentId
    parentId: null | string;
}
