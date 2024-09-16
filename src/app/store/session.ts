import { create, createStore, StateCreator } from "zustand";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import {
  PayloadLogin,
  PayloadRegister,
  User,
  UserBodyRequest,
} from "./session.model";
import { getUserByToken, login, register, updateUser } from "@/services/auth";
import { toast } from "sonner";
import { sendOTP } from "../upload-content/services/steps.service";
import { Country } from "@/services/posts";
import { getCountries } from "@/services/common";

export interface SessionState {
  user?: User;
  countries: Country[];
  isSended: boolean;
  loading: boolean;
  showPassword: boolean;
  _hasHydrated: boolean;
  setHasHydrated: (state: any) => void;
  // Actions
  setShowPassword: (showPassword: boolean) => void;
  login: (body: PayloadLogin) => Promise<void>;
  getUserByToken: () => Promise<void>;
  logout: () => Promise<void>;
  sendVerificationCode: (body: PayloadRegister) => Promise<void>;
  registerUser: (body: PayloadRegister) => Promise<void>;
  getCountries: () => Promise<void>;
  updateDataUser: (body: UserBodyRequest, id: string) => Promise<void>;
}

const storeApi: StateCreator<
  SessionState,
  [["zustand/devtools", never]],
  [["zustand/persist", SessionState]]
> = (set, get) => ({
  user: undefined,
  countries: [],
  isSended: false,
  loading: false,
  showPassword: false,
  _hasHydrated: false,
  setHasHydrated: (state: any) => {
    set({
      _hasHydrated: state,
    });
  },
  getCountries: async () => {
    try {
      const countries = await getCountries();
      set({ countries }, false, "getCountries");
    } catch (error) {
      console.error("Error al obtener los países");
    }
  },
  setShowPassword: (showPassword: boolean) => {
    set({ showPassword }, false, "setShowPassword");
  },
  login: async (body: PayloadLogin) => {
    try {
      set({ loading: true });
      const userData = await login(body);
      set(
        {
          user: userData.user,
        },
        false,
        "loginSuccess"
      );
      setCookie("TOKEN", userData.token);
      toast.success("Sesión iniciada con éxito");
    } catch (error) {
      toast.error("Error al iniciar sesión");
      throw new Error("Failed to login");
    } finally {
      set({ loading: false, isSended: false });
    }
  },
  getUserByToken: async () => {
    const token = getCookie("TOKEN");

    if (token) {
      const userByToken = await getUserByToken(token);
      set(
        {
          user: userByToken,
        },
        false,
        "getUserByToken"
      );
    }
  },
  logout: async () => {
    deleteCookie("TOKEN");
    set({ user: undefined, isSended: false }, false, "logout");
    toast.success("Sesión cerrada con éxito");
  },
  registerUser: async (body) => {
    try {
      set({ loading: true });
      const newUser = await register(body);
      set(
        {
          user: newUser.user,
        },
        false,
        "registerUserSuccess"
      );
      setCookie("TOKEN", newUser.token);
      toast.success("Usuario creado con éxito");
    } catch (error) {
      toast.error("Error al crear usuario");
    } finally {
      set({ loading: false, isSended: false });
    }
  },
  sendVerificationCode: async (body) => {
    try {
      set({ loading: true });
      await sendOTP(body.user.email);
      set(
        {
          isSended: true,
        },
        false,
        "sendVerificationCode"
      );
      toast.success("Código de verificación enviado");
    } catch (error) {
      toast.error("Error al enviar código de verificación");
    } finally {
      set({ loading: false });
    }
  },
  updateDataUser: async (body, id) => {
    try {
      const token = getCookie("TOKEN");
      set({ loading: true });
      const user = await updateUser(
        {
          countryCode: body.countryCode,
          image: body.image,
          name: body.name,
          password: body.password === "" ? undefined : body.password,
          role: body.role,
        },
        id,
        token
      );
      set({ user }, false, "updateDataUserSuccess");
      toast.success("Usuario actualizado con éxito");
    } catch (error) {
      toast.error("Error al actualizar usuario");
    } finally {
      set({ loading: false, isSended: false });
    }
  },
});

export const useAuthStore = create<SessionState>()(
  persist(
    devtools(storeApi, {
      name: "Auth Store",
    }),
    {
      name: "auth-store",
      partialize: (state) => ({ user: state.user }),
      storage: createJSONStorage(() => ({
        // Returning a promise from getItem is necessary to avoid issues with hydration
        getItem: async (name) =>
          new Promise((resolve) =>
            setTimeout(() => {
              const isServer = typeof window === "undefined";
              if (isServer) return;

              const value = localStorage?.getItem(name);
              resolve(value);
            }, 100)
          ),
        setItem: (name, value) => localStorage?.setItem(name, value),
        removeItem: (name) => localStorage?.removeItem(name),
      })),
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true)
      }
    }
  )
);
