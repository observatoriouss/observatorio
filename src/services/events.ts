import { API_URL } from "@/config/api";
import { api } from "./axios";

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
  createdAt: string;
  id: string;
}

export interface Execution {
  from: string;
  to: string;
  id: string;
  participantAttend?: boolean;
}

export interface School {
  name: string;
  createdAt: string;
  id: string;
}

export const getEvents = async (): Promise<Training[]> => {
  const response = await fetch(`${API_URL}/training`);
  return response.json();
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

export interface ProfessorBodyRequest {
  name: string;
  email: string;
  documentType: string;
  documentNumber: number;
  schoolId: string;
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
  professorId: string;
}
export interface Certificate {
  id:               string;
  duration:         number;
  emisionDate:      string;
  trainingFromDate: string;
  trainingToDate:   string;
  url:              string;
}

export interface Participant {
  id: string;
  foreignId: string;
  role: RoleInscription;
  attendanceStatus: string;
  professor: Professor;
  certificate?: Certificate;
}

// {{url}}/api/training/:id/participants
export const addParticipant = async (
  trainingId: string,
  payload: AddParticipantPayload
): Promise<Participant> => {
  const { data } = await api.post<Participant>(
    `/training/${trainingId}/participants`,
    payload
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
  training:    Training;
  executions:  Execution[];
  participant: Participant;
}
export const verifyParticipant = async (
  participantId: string
): Promise<VerifyParticipant> => {
  const { data } = await api.get<VerifyParticipant>(
    `/training/participants/${participantId}/verify`
  );
  return data;
};

export interface SingleTraining extends Training {
  participant: Participant;
}
export interface TrainingByDocument {
  professor: Professor;
  trainings: SingleTraining[];
}

// {{url}}/api/training/by-document/:documentType/:documentNumber
export const getTrainingByDocument = async (
  documentType: string = 'dni',
  documentNumber: number
): Promise<TrainingByDocument> => {
  const { data } = await api.get<TrainingByDocument>(
    `/training/by-document/${documentType}/${documentNumber}`
  );
  return data;
};

// {{url}}/api/training/participants/:participantId/certificate
export const getCertificate = async (
  participantId: string
): Promise<Blob> => {
  const { data } = await api.get<Blob>(
    `/training/participants/${participantId}/certificate`,
    {
      responseType: 'blob',
    }
  );
  return data;
};