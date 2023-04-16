// store.js
import create from 'zustand';

export enum ModalStateEnum {
  MessageBox,
  ContactList,
  Closed,
}

export interface Person {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  url: string;
  profileUrl: string;
  imageUrl: string;
}

type ModalState = {
  isModalOpen: boolean;
  toggleModal: () => void;
  modalState: ModalStateEnum;
  setModalState: (modalState: ModalStateEnum) => void;
  setSelectedPerson: (person: Person | null) => void;
  selectedPerson: Person | null;
  message: string | null;
  setMessage: (message: string | null) => void;
};

export const useModalStore = create<ModalState>((set) => ({
  modalState: ModalStateEnum.Closed,
  isModalOpen: false,
  setModalState: (modalState: ModalStateEnum) => set(() => ({ modalState })),
  selectedPerson: null,
  setSelectedPerson: (person: Person | null) => set(() => ({ selectedPerson: person })),
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  message: '',
  setMessage: (message: string | null) => set(() => ({ message })),
}));
