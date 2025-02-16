import { create } from "zustand";

interface RegisterModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// control whether to display in layout
const useRegisterModal = create<RegisterModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;