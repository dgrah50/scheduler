import { Fragment, useContext, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ModalStateEnum, Person, useModalStore } from '~/store/store';
import MessageBox from './MessageBox';
import { ContactList } from './ContactList';

export function MessageComposer() {
  const { isModalOpen, setModalState, toggleModal, modalState, selectedPerson, setSelectedPerson } =
    useModalStore();

  const onPersonClick = (person: Person) => {
    setSelectedPerson(person);
    setModalState(ModalStateEnum.MessageBox);
  };

  const onClose = () => {
    toggleModal();
    setTimeout(() => setSelectedPerson(null), 500);
  };

  return (
    <Transition.Root show={isModalOpen} as={Fragment} appear>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-3xl transform rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              {modalState === ModalStateEnum.MessageBox && selectedPerson ? (
                <MessageBox selectedPerson={selectedPerson} />
              ) : (
                <ContactList onPersonClick={onPersonClick} />
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export const isPerson = (item: Person | undefined): item is Person => !!item;
