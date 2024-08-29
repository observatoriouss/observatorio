import { create } from "zustand";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { persist, createJSONStorage } from "zustand/middleware";
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

interface State {
  user: User | null;
  countries: Country[];
  isSended: boolean;
  loading: boolean;
  showPassword: boolean;
}

interface Actions {
  setShowPassword: (showPassword: boolean) => void;
  login: (body: PayloadLogin) => Promise<void>;
  getUserByToken: () => Promise<void>;
  logout: () => Promise<void>;
  sendVerificationCode: (body: PayloadRegister) => Promise<void>;
  registerUser: (body: PayloadRegister) => Promise<void>;
  getCountries: () => Promise<void>;
  updateDataUser: (body: UserBodyRequest, id: string) => Promise<void>;
}

export const authStore = create<
  State & Actions,
  [["zustand/persist", State & Actions]]
>(
  persist(
    (set, get) => ({
      user: null,
      countries: [],
      isSended: false,
      loading: false,
      showPassword: false,
      getCountries: async () => {
        const countries = await getCountries();
        set({ countries });
      },
      setShowPassword: (showPassword: boolean) => {
        set({ showPassword });
      },
      login: async (body: PayloadLogin) => {
        try {
          set({ loading: true });
          const userData = await login(body);
          set({
            user: userData.user,
          });
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
          set({
            user: userByToken,
          });
        }
      },
      logout: async () => {
        deleteCookie("TOKEN");
        set({ user: null, isSended: false });
        toast.success("Sesión cerrada con éxito");
      },
      registerUser: async (body) => {
        try {
          set({ loading: true });
          const newUser = await register(body);
          set({
            user: newUser.user,
          });
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
          set({
            isSended: true,
          });
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
          const user = await updateUser({
            countryCode: body.countryCode,
            image: body.image,
            name: body.name,
            password: body.password === "" ? undefined : body.password,
            role: body.role,
            
          }, id, token);
          set({ user });
          toast.success("Usuario actualizado con éxito");
        } catch (error) {
          toast.error("Error al actualizar usuario");
        } finally {
          set({ loading: false, isSended: false });
        }
      },
    }),
    {
      name: "auth-store",
      // skipHydration: true,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
