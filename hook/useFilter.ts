import { create } from "zustand";

interface FilterState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// control whether to display filter
const useFilter = create<FilterState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFilter;