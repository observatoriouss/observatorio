import { create } from "zustand";
import SearchDocument from '../steps/1-search-document';
import ValidationData from '../steps/2-validation-data';
import EmailVerification from "../steps/3-email-verification";
import CreatePost from "../steps/4-create-post";
import Confirmation from "../steps/5-confirmation";
import { createGuest, createRequestPost, getGuest, Guest, sendOTP, updateGuest, uploadFile, verifyOTP } from "../services/steps.service";
import { Category } from "@/services/home";

export enum Steps {
  Search = "search",
  DataValidation = "dataValidation",
  EmailVerification = "emailVerification",
  CreateNewPost = "createNewPost",
  Confirmation = "confirmation",
}
export const STEPS = [
  {
    value: Steps.Search,
    position: 1,
    label: 'Búsqueda de DNI',
    component: <SearchDocument />
  },
  {
    value: Steps.DataValidation,
    position: 2,
    label: 'Validación de Datos',
    component: <ValidationData />
  },
  {
    value: Steps.EmailVerification,
    position: 3,
    label: 'Verificación de Email',
    component: <EmailVerification />
  },
  {
    value: Steps.CreateNewPost,
    position: 4,
    label: 'Crear publicación',
    component: <CreatePost />
  },
  {
    value: Steps.Confirmation,
    position: 5,
    label: 'Confirmación',
    component: <Confirmation />
  },
]
export interface RequestPost {
  guestId: string;
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
  id?: string;
}

type State = {
  step: Steps;
  loading: boolean;
  guest: Guest | null;
  requestGuest: Partial<Guest>;
  otp: string;
  requestPost: RequestPost;
  idRequest: string;
};

type Actions = {
  setSteps: (step: Steps) => void;
  searchDocument: (documentNumber: number) => Promise<void>;
  fillOTP: (otp: string) => void;
  validateData: (data: Partial<Guest>) => Promise<void>;
  confirmOTP: () => Promise<void>;
  crtPost: (payload: RequestPost) => Promise<void>;
  uploadService: (file: File) => Promise<{ url: string }>;
};

export const StepStore = create<State & Actions>((set) => ({
  step: Steps.CreateNewPost,
  loading: false,
  guest: null,
  otp: '',
  requestGuest: {
    documentType: 'dni',
  } as Partial<Guest>,
  requestPost: {
    guestId: '',
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
    tags: []
  },
  idRequest: '',
  setSteps: (step) => set({ step }),
  fillOTP: (otp) => set({ otp }),
  searchDocument: async (documentNumber) => {
    try {
      set({ loading: true });
      const guest = await getGuest('dni', documentNumber.toString());
      set({
        guest,
        requestGuest: guest,
      });
    } catch (error) {
      console.error(error);
      set({
        guest: null,
        requestGuest: {
          documentNumber: documentNumber.toString(),
          documentType: 'dni',
          name: '',
          email: '',
        } as Partial<Guest>,
      });
    } finally {
      set({
        step: Steps.DataValidation,
        loading: false,
      })
    }
  },
  validateData: async (request) => {
    const requestPost = StepStore.getState().requestPost;
    try {
      set({ loading: true });
      const guestStore = StepStore.getState().guest;

      if (guestStore) {
        const guest = await updateGuest(guestStore.id, request);
        set({
          guest,
          step: Steps.EmailVerification,
          requestPost: {
            ...requestPost,
            guestId: guest.id,
          }
        });
        sendOTP(guest.email);
      } else {
        const guest = await createGuest(request);
        set({
          guest,
          step: Steps.EmailVerification,
          requestPost: {
            ...requestPost,
            guestId: guest.id,
          }
        });
        sendOTP(guest.email);
      }
    } catch (error) {
      console.error(error);
      set({
        requestGuest: {} as Partial<Guest>,
        guest: null,
        step: Steps.Search
      });
    } finally {
      set({ loading: false });
    }
  },
  confirmOTP: async () => {
    const guestStore = StepStore.getState().guest;
    const otp = StepStore.getState().otp;
    if (!guestStore) return;
    try {
      set({ loading: true });
      await verifyOTP(guestStore.email, otp);
      set({
        step: Steps.CreateNewPost
      });
    } catch (error) {
      console.error(error);
      set({
        step: Steps.DataValidation
      });
    } finally {
      set({ loading: false });
    }
  },
  crtPost: async (payload) => {
    const guestStore = StepStore.getState().guest;
    if (!guestStore) return;
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
