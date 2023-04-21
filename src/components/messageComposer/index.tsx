import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ModalStateEnum, Person, useModalStore } from '~/store/modalStore';
import MessageBox from './MessageBox';
import { ContactList } from './ContactList';

export function MessageComposer() {
  const {
    isModalOpen,
    setModalState,
    toggleModal,
    modalState,
    selectedPerson,
    setSelectedPerson,
    setMessage,
  } = useModalStore();

  const onPersonClick = (person: Person) => {
    setSelectedPerson(person);
    setModalState(ModalStateEnum.MessageBox);
  };

  const onClose = () => {
    toggleModal();

    setTimeout(() => {
      setSelectedPerson(null);
      setMessage(null);
    }, 500);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Schedule a message</DialogTitle>
          <DialogDescription>
            {modalState === ModalStateEnum.MessageBox && selectedPerson ? (
              <MessageBox selectedPerson={selectedPerson} />
            ) : (
              <ContactList onPersonClick={onPersonClick} />
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export const isPerson = (item: Person | undefined): item is Person => !!item;
