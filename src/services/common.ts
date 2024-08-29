import { api } from "./axios";
import { Country } from "./posts";

export interface ResponseUploadFile {
  url: string;
}
export const uploadFile = async (
  file: File,
  name?: string
): Promise<ResponseUploadFile> => {
  const formData = new FormData();
  formData.append("file", file);
  if (name) {
    formData.append("name", name);
    formData.append("saveReference", "true");
  }
  const { data } = await api.post<ResponseUploadFile>(
    `/storage/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data as ResponseUploadFile;
};

export const getCountries = async (): Promise<Country[]> => {
  const { data } = await api.get(`/countries`);
  return data as Country[];
};
