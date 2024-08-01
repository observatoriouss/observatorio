import { create } from "zustand";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { persist, createJSONStorage } from "zustand/middleware";
import { PayloadLogin, PayloadRegister, User } from "./session.model";
import { getUserByToken, login, register } from "@/services/auth";
import { toast } from "sonner";
import { sendOTP } from "../upload-content/services/steps.service";

interface State {
  user: User | null;
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
}

export const authStore = create<
  State & Actions,
  [["zustand/persist", State & Actions]]
>(
  persist(
    (set, get) => ({
      user: null,
      isSended: false,
      loading: false,
      showPassword: false,
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

        console.log(token);

        if (token) {
          const userByToken = await getUserByToken(token);
          set({
            user: userByToken,
          });
        }
      },
      logout: async () => {
        console.log(getCookie("TOKEN"));
        deleteCookie("TOKEN");
        set({ user: null, isSended: false });
        toast.success("Sesión cerrada con éxito");
      },
      registerUser: async (body) => {
        try {
          set({ loading: true });
          console.log(body);
          const newUser = await register(body);
          set({
            user: newUser.user,
          });
          setCookie("TOKEN", newUser.token);
          toast.success("Usuario creado con éxito");
          console.log(newUser);
        } catch (error) {
          console.log(error);
          toast.error("Error al crear usuario");
        } finally {
          set({ loading: false, isSended: false });
        }
      },
      sendVerificationCode: async (body) => {
        try {
          set({ loading: true });
          console.log(body);
          await sendOTP(body.user.email);
          set({
            isSended: true,
          });
          toast.success("Código de verificación enviado");
        } catch (error) {
          console.log(error);
          toast.error("Error al enviar código de verificación");
        } finally {
          set({ loading: false });
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
