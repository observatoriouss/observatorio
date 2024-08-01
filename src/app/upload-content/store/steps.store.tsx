import { create } from "zustand";
import ValidationData from '../steps/2-validation-data';
import CreatePost from "../steps/4-create-post";
import Confirmation from "../steps/5-confirmation";
import { createRequestPost, uploadFile } from "../services/steps.service";
import { Category } from "@/services/home";

export enum Steps {
  DataValidation = "dataValidation",
  CreateNewPost = "createNewPost",
  Confirmation = "confirmation",
}
export const STEPS = [
  {
    value: Steps.DataValidation,
    position: 1,
    label: 'Validación de Datos',
    component: <ValidationData />
  },
  {
    value: Steps.CreateNewPost,
    position: 2,
    label: 'Crear publicación',
    component: <CreatePost />
  },
  {
    value: Steps.Confirmation,
    position: 3,
    label: 'Confirmación',
    component: <Confirmation />
  },
]
export interface RequestPost {
  userId: string;
  title: string;
  category: Category;
  subCategory: string | null;
  description: string | null;
  content: string;
  imageUrl: string | null;
  imageDescription: string | null;
  videoUrl: string | null;
  podcastUrl: string | null;
  attachments: string[] | null;
  tags: string[];
  isPendingApproval: boolean;
  id?: string;
}

type State = {
  step: Steps;
  loading: boolean;
  otp: string;
  requestPost: RequestPost;
  idRequest: string;
};

type Actions = {
  setSteps: (step: Steps) => void;
  crtPost: (payload: RequestPost) => Promise<void>;
  uploadService: (file: File) => Promise<{ url: string }>;
};

export const StepStore = create<State & Actions>((set) => ({
  step: Steps.DataValidation,
  loading: false,
  otp: '',
  requestPost: {
    userId: '',
    title: '',
    category: Category.NEWS,
    subCategory: null,
    description: null,
    content: '',
    imageUrl: null,
    imageDescription: null,
    videoUrl: null,
    podcastUrl: null,
    attachments: [],
    isPendingApproval: false,
    tags: []
  },
  idRequest: '',
  setSteps: (step) => set({ step }),
  crtPost: async (payload) => {
    try {
      set({ loading: true });
      const request = await createRequestPost(payload);
      set({
        step: Steps.Confirmation,
        idRequest: request.id
      });
    } catch (error) {
      console.error(error);
      set({
        step: Steps.CreateNewPost
      });
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
      return { url: '' };
    } finally {
      set({ loading: false });
    }
  }
}));
