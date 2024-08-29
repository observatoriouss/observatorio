import { uploadFile } from "@/app/upload-content/services/steps.service";
import { RequestPost } from "@/app/upload-content/store/steps.store";
import {
    ApprovalStatus,
  getRequestsByUserId,
  Request,
  updateRequestStatus,
} from "@/services/requests";
import { toast } from "sonner";
import { create } from "zustand";

export type ActionsTypes =
  | "edit"
  | "create"
  | "delete"
  | "view"
  | "list"
  | "accept"
  | "edit-request"
  | "list-rejects"
  | "none";

type State = {
  loading: boolean;
  myRequests: Request[];
  open: boolean;
  requestSelected: Request | null;
  action: ActionsTypes;
};

type Actions = {
  setLoading: (loading: boolean) => void;
  getRequestsByUser: (userId: string) => Promise<void>;
  setRequestSelected: (requestId: string, action: ActionsTypes) => void;
  setOpen: (open: boolean) => void;
  updateRequest: (requestId: string, payload: RequestPost) => Promise<void>;
  uploadService: (file: File) => Promise<{ url: string }>;
};

export const RequestStore = create<State & Actions>((set) => ({
  loading: false,
  myRequests: [],
  action: "none",
  open: false,
  requestSelected: null,
  setLoading: (loading) => set({ loading }),
  getRequestsByUser: async (userId) => {
    try {
      set({ loading: true });
      const myRequests = await getRequestsByUserId(userId);
      set({ myRequests });
      toast.success("Búsqueda realizada con éxito.");
    } catch (error) {
      toast.error(
        "No se encontró ninguna solicitud asociada al usuario ingresado."
      );
      set({ myRequests: [] });
    } finally {
      set({ loading: false });
    }
  },
  setRequestSelected: (requestId, action) => {
    console.log({ requestId, action });
    const requestSelected = RequestStore.getState().myRequests.find(
      (Request) => Request.id === requestId
    );
    set({ requestSelected, action, open: !!requestId });
  },
  setOpen: (open) => set({ open }),
  updateRequest: async (id, payload) => {
    try {
      set({ loading: true });
      const updatedRequest = await updateRequestStatus(id, {
        newData: {
            ...payload,
            attachments: payload.attachments?.length ? payload.attachments : [],
        },
        approvalStatus: ApprovalStatus.pending,
      });
      const updatedRequests = RequestStore.getState().myRequests.map(
        (request) => {
          if (request.id === id) {
            return updatedRequest;
          }
          return request;
        }
      );
      set({ myRequests: updatedRequests });
      set({ open: false });
    } catch (error) {
      console.error("Ocurrió un error inesperado, intente nuevamente", error);
    } finally {
      set({ loading: false });
    }
  },
  uploadService: async (file) => {
    try {
      set({ loading: true });
      const data = await uploadFile(file);
      return data;
    } catch (error) {
      console.error(error);
      return { url: "" };
    } finally {
      set({ loading: false });
    }
  },
}));
