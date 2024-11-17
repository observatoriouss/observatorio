import { ProfessorEmploymentType, School } from "@/services/events";
import { Country } from "@/services/posts";

export interface PayloadLogin {
  email: string;
  password: string;
}
export interface PayloadRegister {
  user: {
    name: string;
    email: string;
    password: string;
    role: "user" | "professor";
    documentType?: "dni";
    documentNumber?: string;
    employmentType?: ProfessorEmploymentType;
    schoolId?: string;
  };
  verificationCode: string;
}
export interface Session {
  user: User;
  token: string;
}

export interface User {
  name: string;
  email: string;
  role: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  id: string;
  slug: string;
  country?: Country;
  countryCode: string;
  biography?: string;
  documentType?: "dni";
  documentNumber?: string;
  employmentType?: ProfessorEmploymentType;
  schoolId?: string;
  school?: School;
}
export interface UserBodyRequest {
  name: string;
  email?: string;
  password?: string;
  image: string;
  role: "user" | "professor";
  countryCode: string;
  biography?: string;
  documentType?: "dni";
  documentNumber?: string;
  employmentType?: ProfessorEmploymentType;
  schoolId?: string;
}

export interface PayloadRecoverAccount {
  email: string;
}

export interface PayloadResetPassword {
  password: string;
  token: string;
}
