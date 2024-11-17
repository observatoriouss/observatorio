import { getCookie } from "cookies-next";
import { api } from "./axios";
import { RequestPost } from "@/app/upload-content/store/steps.store";
import { Category } from "./home";
import { User } from "@/stores/session";

// //pending - approved - rejected
export enum ApprovalStatus {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
}
export const MapApprovalStatus: {
  [key in ApprovalStatus]: string;
} = {
  pending: "Pendiente",
  approved: "Aprobado",
  rejected: "Rechazado",
};
export interface Request {
  id: string;
  title: string;
  slug: string;
  category: Category;
  readingTime: number;
  description: string;
  imageUrl: string;
  content: string;
  videoUrl: string | null;
  podcastUrl: string | null;
  attachments: string[] | null;
  imageDescription: string | null;
  likes: number;
  userId: string;
  tags: string[];
  createdAt: string;
  approvalStatus: ApprovalStatus;
  rejectionReasons: RejectionReason[];
  user: User;
}

export interface RejectionReason {
  id: string;
  reason: string;
  createdAt: string;
}

// {{url}}/api/posts/find/requests?userId=f1cfb121-2957-4a1a-b33d-74c4d15e6d46
// find requests by user id
export async function getRequestsByUserId(userId: string): Promise<Request[]> {
  const { data } = await api.get<Request[]>(
    `/posts/find/requests?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${getCookie("TOKEN")}`,
      },
    }
  );
  return data;
}

export interface UpdateRequestStatus {
  approvalStatus: ApprovalStatus;
  newData: RequestPost;
}
export const updateRequestStatus = async (
  id: string,
  body: UpdateRequestStatus
): Promise<Request> => {
  const { data } = await api.post(`/posts/update-request/${id}`, body, {
    headers: {
      Authorization: `Bearer ${getCookie("TOKEN")}`,
    },
  });
  return data;
};
