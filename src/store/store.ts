// store.js
import create from 'zustand';

type ModalState = {
  isModalOpen: boolean;
  toggleModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}));
