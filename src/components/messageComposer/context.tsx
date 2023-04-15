import React, { createContext } from 'react';

export enum ModalStateEnum {
  MessageBox,
  ContactList,
}

interface MessageComposerContext {
  modalState: ModalStateEnum | null;
  setModalState: (state: ModalStateEnum) => void;
}

export const MessageComposerContext = createContext<MessageComposerContext>({
  modalState: null,
  setModalState: () => {},
});

interface MessageComposerContextProviderProps {
  children: React.ReactNode;
}

export const MessageComposerContextProvider = ({
  children,
}: MessageComposerContextProviderProps) => {
  const [modalState, setModalState] = React.useState<ModalStateEnum>(ModalStateEnum.ContactList);

  const value = React.useMemo(
    () => ({
      modalState,
      setModalState,
    }),
    [modalState],
  );
  return (
    <MessageComposerContext.Provider value={value}>{children}</MessageComposerContext.Provider>
  );
};
