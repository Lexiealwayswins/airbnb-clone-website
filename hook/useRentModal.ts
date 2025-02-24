import { create } from "zustand";

interface RentModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// control whether to display in layout
const useRentModal = create<RentModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRentModal;