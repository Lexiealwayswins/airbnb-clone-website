import { create } from "zustand";

interface LoginModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// control whether to display in layout
const useLoginModal = create<LoginModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;