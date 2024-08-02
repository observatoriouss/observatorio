import { TrainingErrorCode } from "@/lib/error-codes";
import { ErrorType } from "@/lib/types";
import {
  addParticipant,
  confirmRegister,
  createProfessor,
  getProfessor,
  getSchools,
  Participant,
  Professor,
  ProfessorBodyRequest,
  RoleInscription,
  School,
} from "@/services/events";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";

type State = {
  loading: boolean;
  verifyComplete: boolean;
  succesfulRegister: boolean;
  professor: Professor | null;
  schools: School[];
  inscription: Participant | null;
};

type Actions = {
  setLoading: (loading: boolean) => void;
  setProfessor: (professor: Professor | null) => void;
  validateExistDNI: (documentNumber: number) => Promise<void>;
  getListSchools: () => Promise<void>;
  registerProfessor: (professor: ProfessorBodyRequest) => Promise<void>;
  completeOTP: (otp: string) => Promise<void>;
  completeInscription: (
    trainingId: string,
    roles: RoleInscription[]
  ) => Promise<Participant>;
  clearCache: () => void;
};

export const InscriptionEventStore = create<State & Actions>((set) => ({
  loading: false,
  professor: null,
  succesfulRegister: false,
  schools: [],
  verifyComplete: false,
  inscription: null,
  setLoading: (loading) => set({ loading }),
  setProfessor: (professor) => set({ professor }),
  getListSchools: async () => {
    try {
      set({ loading: true });
      const schools = await getSchools();
      set({ schools });
    } catch (error) {
      console.log("error store");
    } finally {
      set({ loading: false });
    }
  },
  validateExistDNI: async (documentNumber: number) => {
    try {
      set({ loading: true });
      const professor = await getProfessor("dni", documentNumber);
      console.log({ professor });
      set({ professor });
      toast.success(
        "El documento se encuentra registrado en la base de datos."
      );
    } catch (error) {
      console.log("error store");
      toast.error(
        "No se encontró el documento registrado en la base de datos. Por favor, verifique los datos ingresados o complete el formulario de inscripción."
      );
      set({ professor: null });
    } finally {
      set({ loading: false });
      set({ verifyComplete: true });
    }
  },
  registerProfessor: async (professor) => {
    try {
      set({ loading: true });
      await createProfessor(professor);
      set({ succesfulRegister: true });
      toast.success("Profesor registrado con éxito.");
    } catch (error) {
      console.log("error store");
      toast.error("Ocurrió un error al registrar el profesor.");
    } finally {
      set({ loading: false });
    }
  },
  completeOTP: async (otp) => {
    try {
      set({ loading: true });
      const professor = await confirmRegister(otp);
      toast.success("Código de verificación correcto.");
      set({ verifyComplete: true });
      set({ succesfulRegister: false });
      set({ professor });
    } catch (error) {
      console.log("error store");
      toast.error("Código de verificación incorrecto.");
    } finally {
      set({ loading: false });
    }
  },
  completeInscription: async (trainingId, roles): Promise<Participant> => {
    const professor = InscriptionEventStore.getState().professor;
    if (!professor) {
      toast.error("Por favor, complete el registro del profesor.");
      set({ inscription: null });
      return Promise.reject("Por favor, complete el registro del profesor.");
    }
    try {
      set({ loading: true });
      const inscription = await addParticipant(trainingId, {
        roles,
        professorId: professor.id,
      });
      console.log({ inscription });
      toast.success("Inscripción completada con éxito.");
      set({ inscription });
      return inscription;
    } catch (error) {
      console.log({ error })
      const code = ((error as AxiosError)?.response?.data as ErrorType)?.code as keyof typeof TrainingErrorCode;
      toast.error(TrainingErrorCode[code] ?? "Ocurrió un error inesperado, intente nuevamente");
      return Promise.reject(error);
    } finally {
      set({ loading: false });
    }
  },
  clearCache: () => {
    set({ professor: null });
    set({ verifyComplete: false });
    set({ succesfulRegister: false });
    set({ inscription: null });
    set({ loading: false });
  }
}));
