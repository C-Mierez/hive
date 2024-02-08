import { create } from "zustand";

const defaultValues = { id: "", title: "" };

interface IRenameModal {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onClose: () => void;
  onOpen: (values: typeof defaultValues) => void;
}

export const useRenameModal = create<IRenameModal>((set) => ({
  isOpen: false,
  initialValues: defaultValues,
  onClose: () => set({ isOpen: false, initialValues: defaultValues }),
  onOpen: (values) => set({ isOpen: true, initialValues: values }),
}));
