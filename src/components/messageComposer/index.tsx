import { Fragment, useContext, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import MessageBox from './MessageBox';
import { ContactList } from './ContactList';
import { people } from './mockData';
import { MessageComposerContext, ModalStateEnum } from './context';
import { useModalStore } from '~/store/store';

export function MessageComposer() {
  const [query, setQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const { isModalOpen, toggleModal } = useModalStore();

  const { modalState, setModalState } = useContext(MessageComposerContext);

  const filteredPeople = people.filter((person) => {
    return person.name.toLowerCase().includes(query.toLowerCase());
  });

  const onPersonClick = (person: Person) => {
    setSelectedPerson(person);
    setModalState(ModalStateEnum.MessageBox);
  };

  return (
    <Transition.Root show={isModalOpen} as={Fragment} afterLeave={() => setQuery('')} appear>
      <Dialog as="div" className="relative z-10" onClose={toggleModal}>
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
            <Dialog.Panel className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              {modalState === ModalStateEnum.MessageBox && selectedPerson ? (
                <MessageBox selectedPerson={selectedPerson} />
              ) : (
                ContactList(setQuery, onPersonClick, filteredPeople, query)
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
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
export const isPerson = (item: Person | undefined): item is Person => {
  return !!item;
};
