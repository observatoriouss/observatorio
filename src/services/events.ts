import { api } from "./axios";
import { getCookie } from "cookies-next";
import { User } from "@/stores/session";

export enum TrainingStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
export enum MapTrainingStatus {
  active = "Activo",
  inactive = "Inactivo",
}
export enum TrainingModality {
  PRESENTIAL = "presential",
  VIRTUAL = "virtual",
  SEMIPRESENTIAL = "semipresential",
}
export enum MapTrainingModality {
  presential = "Presencial",
  virtual = "Virtual",
  semipresential = "Semipresencial",
}
export interface Training {
  code: string;
  name: string;
  organizer: "DDA" | School;
  description: string;
  status: MapTrainingStatus;
  modality: TrainingModality;
  capacity: number;
  endDate: string;
  executions: Execution[];
  participants: Participant[];
  participantsCount: number;
  createdAt: string;
  id: string;
}

export interface Execution {
  from: string;
  to: string;
  id: string;
  participantAttend?: boolean;
  place: string;
  durationInMinutes: number;
}

export interface School {
  name: string;
  createdAt: string;
  id: string;
}

export const getEvents = async (): Promise<Training[]> => {
  const { data } = await api.get<Training[]>(`/training`, {
    params: {
      onlyActives: true,
    },
    headers: {
      Authorization: `Bearer ${getCookie("TOKEN")}`,
    },
  });
  console.log({ data });
  return data;
};

export interface Professor {
  name: string;
  email: string;
  documentNumber: string;
  schoolId: string;
  documentType: string;
  createdAt: string;
  id: string;
}

// {{url}}/api/professors/:documentType/:documentNumber
export const getProfessor = async (
  documentType: string,
  documentNumber: number
): Promise<Professor> => {
  const { data } = await api.get<Professor>(
    `/professors/${documentType}/${documentNumber}`
  );
  return data;
};
export enum ProfessorEmploymentType {
  FULL_TIME = "full_time",
  PART_TIME = "part_time",
}

export const MapProfessorEmploymentType = {
  [ProfessorEmploymentType.FULL_TIME]: "Tiempo completo",
  [ProfessorEmploymentType.PART_TIME]: "Medio tiempo",
};
export enum ProfessorDocumentType {
  DNI = "dni",
  PASSPORT = "passport",
  FOREIGNER_CARD = "foreigner_card",
}
export const MapProfessorDocumentType: Record<ProfessorDocumentType, string> = {
  [ProfessorDocumentType.DNI]: "DNI",
  [ProfessorDocumentType.PASSPORT]: "Pasaporte",
  [ProfessorDocumentType.FOREIGNER_CARD]: "Carnet de extranjería",
};
export interface ProfessorBodyRequest {
  name: string;
  email: string;
  documentType: string;
  documentNumber: number;
  schoolId: string;
  employmentType: ProfessorEmploymentType;
}
// {{url}}/api/professors
export const createProfessor = async (
  professor: ProfessorBodyRequest
): Promise<Professor> => {
  const { data } = await api.post<Professor>(`/professors`, professor);
  return data;
};

export interface School {
  name: string;
  createdAt: string;
  id: string;
}
// {{url}}/api/schools
export const getSchools = async (): Promise<School[]> => {
  const { data } = await api.get<School[]>(`/schools`);
  return data;
};

// "assistant", "organizer", "speaker"
export enum RoleInscription {
  ASSISTANT = "assistant",
  SPEAKER = "speaker",
  ORGANIZER = "organizer",
}
export enum MapRoleInscription {
  assistant = "Asistente",
  speaker = "Ponente",
  organizer = "Organizador",
}

export interface AddParticipantPayload {
  roles: RoleInscription[];
}
export interface Certificate {
  id: string;
  duration: number;
  emisionDate: string;
  trainingFromDate: string;
  trainingToDate: string;
  url: string;
  role: RoleInscription;
}

export interface Participant {
  id: string;
  foreignId: string;
  role: RoleInscription;
  attendanceStatus: string;
  user: User;
  certificates: Certificate[];
}

// {{url}}/api/training/:id/participants
export const addParticipant = async (
  trainingId: string,
  payload: AddParticipantPayload
): Promise<Participant> => {
  const { data } = await api.post<Participant>(
    `/training/${trainingId}/participants`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${getCookie("TOKEN")}`,
      },
    }
  );
  return data;
};

// {{url}}/api/professors/confirmRegister/:code
export const confirmRegister = async (code: string): Promise<Professor> => {
  const { data } = await api.post<Professor>(
    `/professors/confirm-register/${code}`
  );
  return data;
};

// {{url}}/api/training/participants/:participantId/verify
export interface VerifyParticipant {
  training: Training & {
    credentialBackgroundUrl: string;
    credentialHelpText: string;
    credentialLogos: string[];
    credentialTextToShare: string;
  };
  executions: Execution[];
  participant: Participant;
}
export const verifyParticipant = async (
  participantId: string
): Promise<VerifyParticipant> => {
  const { data } = await api.get<VerifyParticipant>(
    `/training/participants/${participantId}/verify`,
    {
      headers: {
        Authorization: `Bearer ${getCookie("TOKEN")}`,
      },
    }
  );
  console.log({ data });
  return data;
};

export interface ResourcesCredential {
  bg: string;
  band: string;
}

// {{url}}/api/app-configuration
export const getResourcesCredential =
  async (): Promise<ResourcesCredential> => {
    const { data } = await api.get<ResourcesCredential>("/app-configuration");
    return data;
  };
export interface SingleTraining extends Training {
  participant: Participant;
}
export interface TrainingByDocument {
  professor: User;
  trainings: SingleTraining[];
}

// {{url}}/api/training/by-document/:documentType/:documentNumber
export const getTrainingByDocument = async (
  documentType: string = "dni",
  documentNumber: string
): Promise<TrainingByDocument> => {
  const { data } = await api.get<TrainingByDocument>(
    `/training/by-document/${documentType}/${documentNumber}`
  );
  return data;
};

// {{url}}/api/training/participants/:participantId/certificate
export const getCertificate = async (participantId: string): Promise<Blob> => {
  const { data } = await api.get<Blob>(
    `/training/participants/${participantId}/certificate`,
    {
      responseType: "blob",
    }
  );
  return data;
};

// {{url}}/api/training/:id
export const getTraining = async (id: string): Promise<Training> => {
  const { data } = await api.get<Training>(`/training/${id}`, {
    headers: {
      Authorization: `Bearer ${getCookie("TOKEN")}`,
    },
  });
  return data;
};

// registerAsistanceToExecution
// {{url}}/api/training/:id/executions/:executionId/attendances
export const registerAsistanceToExecution = async (
  trainingId: string,
  executionId: string
): Promise<void> => {
  await api.post(
    `/training/${trainingId}/executions/${executionId}/attendances`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getCookie("TOKEN")}`,
      },
    }
  );
};
