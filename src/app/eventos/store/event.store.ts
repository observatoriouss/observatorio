import { Execution, Training } from "@/services/events";
import { toast } from "sonner";
import { create } from "zustand";

type State = {
  loading: boolean;
  open: boolean;
  openExecutions: boolean;
  executionsSelected: Execution[];
  trainingSelected: Training | null;
};

type Actions = {
  setLoading: (loading: boolean) => void;
  setOpen: (open: boolean) => void;
  setOpenExecutions: (open: boolean) => void;
  setExecutionsSelected: (executions: Execution[]) => void;
  setTrainingSelected: (training: Training | null) => void;
};

export const EventStore = create<State & Actions>((set) => ({
  loading: false,
  open: false,
  openExecutions: false,
  executionsSelected: [],
  trainingSelected: null,
  setLoading: (loading) => set({ loading }),
  setOpen: (open) => set({ open }),
  setTrainingSelected: (training) => set({ trainingSelected: training }),
  setOpenExecutions: (openExecutions) => set({ openExecutions }),
  setExecutionsSelected: (executions) =>
    set({ executionsSelected: executions, openExecutions: true }),
}));
