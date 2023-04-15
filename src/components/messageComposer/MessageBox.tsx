import { Fragment, useContext, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CalendarIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { api } from '~/utils/api';
import { ModalStateEnum, Person, useModalStore } from '~/store/store';

const dueDates: DueDate[] = [
  { name: 'No due date', value: null },
  { name: 'Today', value: 'today' },
];
interface DueDate {
  name: string;
  value: string | null;
}

interface MessageBoxProps {
  selectedPerson: Person;
  defaultMessageValue?: string;
}

export default function MessageBox({ selectedPerson, defaultMessageValue }: MessageBoxProps) {
  const [dated, setDated] = useState<DueDate>(dueDates[0] as DueDate);
  const { setModalState } = useModalStore();
  const [message, setMessage] = useState<string>(defaultMessageValue ?? '');
  const utils = api.useContext();

  const addMessage = api.messages.addMessage.useMutation({
    async onSuccess() {
      utils.messages.getAll.invalidate();
      setModalState(ModalStateEnum.ContactList);
    },
  });

  async function sendMessage() {
    addMessage.mutateAsync({
      channel: 'WhatsApp',
      message: message,
      recipient: selectedPerson.name,
      recipient_number: selectedPerson.phone,
      userId: 1,
    });
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm">
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex">
            <RecipientAvatar selectedPerson={selectedPerson} />
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                setModalState(ModalStateEnum.ContactList);
              }}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
            >
              Back
            </button>
          </div>
        </div>
        <label htmlFor="title" className="sr-only">
          {`Schedule a birthday message for ${selectedPerson.name.split(' ')[0]}!`}
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
          placeholder={`Schedule a birthday message for ${selectedPerson.name.split(' ')[0]}!`}
        />
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          rows={2}
          name="message"
          id="message"
          className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder={`Happy birthday, ${selectedPerson.name.split(' ')[0]}!`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9" />
          </div>
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-px bottom-0">
        {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
        <div className="flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3">
          <Listbox as="div" value={dated} onChange={setDated} className="flex-shrink-0">
            {({ open }) => (
              <>
                <Listbox.Label className="sr-only"> Add a due date </Listbox.Label>
                <div className="relative">
                  <Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                    <CalendarIcon
                      className={classNames(
                        dated.value === null ? 'text-gray-300' : 'text-gray-500',
                        'h-5 w-5 flex-shrink-0 sm:-ml-1',
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        dated.value === null ? '' : 'text-gray-900',
                        'hidden truncate sm:ml-2 sm:block',
                      )}
                    >
                      {dated.value === null ? 'Due date' : dated.name}
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {dueDates.map((dueDate) => (
                        <Listbox.Option
                          key={dueDate.value}
                          className={({ active }) =>
                            classNames(
                              active ? 'bg-gray-100' : 'bg-white',
                              'relative cursor-default select-none px-3 py-2',
                            )
                          }
                          value={dueDate}
                        >
                          <div className="flex items-center">
                            <span className="block truncate font-medium">{dueDate.name}</span>
                          </div>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>

        <div className="flex items-center justify-end space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                sendMessage();
              }}
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

interface RecipientAvatarProps {
  selectedPerson: Person;
}

function RecipientAvatar({ selectedPerson }: RecipientAvatarProps) {
  return (
    <a href="#" className="group block flex-shrink-0">
      <div className="flex items-center">
        <div>
          <img className="inline-block h-9 w-9 rounded-full" src={selectedPerson.imageUrl} alt="" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            {selectedPerson.name}
          </p>
        </div>
      </div>
    </a>
  );
}
