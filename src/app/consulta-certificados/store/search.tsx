import { generateCertificate, getTrainingByDocument, MapRoleInscription, TrainingByDocument } from "@/services/events";
import { toast } from "sonner";
import { create } from "zustand";

type State = {
    loading: boolean;
    trainings: TrainingByDocument | null;
};

type Actions = {
    setLoading: (loading: boolean) => void;
    getCertificationsByDNI: (documentNumber: string, documentType?: string) => Promise<void>;
    downloadCertificate: ({
        trainingId,
        participantId,
        role,
    }) => Promise<void>;
};

export const useSearchStore = create<State & Actions>()((set) => ({
    loading: false,
    trainings: null,
    setLoading: (loading) => set({ loading }),
    getCertificationsByDNI: async (documentNumber: string, documentType = 'dni') => {
        try {
            set({ loading: true });
            const trainings = await getTrainingByDocument(documentType, documentNumber);
            set({ trainings });
            toast.success(
                "Búsqueda realizada con éxito."
            );
        } catch (error) {
            toast.error(
                "No se encontró ningún documento asociado al DNI ingresado."
            );
            set({ trainings: null });
        } finally {
            set({ loading: false });
        }
    },
    downloadCertificate: async ({
        trainingId,
        participantId,
        role,
    }) => {
        try {
            set({ loading: true });
            if (!trainingId || !participantId || !role) return;
            const blob = await generateCertificate({
                trainingId,
                participantId,
                role,
            })
            // console.log({ response })
            // const blob = await response.blob();

            // Crea una URL para el Blob y descarga el archivo
            const urlBlob = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = urlBlob;
            a.download = `Certificado ${MapRoleInscription[role]}.pdf`; // Nombre del archivo descargado
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(urlBlob);
            document.body.removeChild(a);
        } catch (error) {
            console.log(error);
            toast.error("Error al generar PDF");
        } finally { set({ loading: false }); }
    },
}));
