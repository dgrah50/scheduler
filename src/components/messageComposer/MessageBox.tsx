import { Fragment, LegacyRef, ReactNode, forwardRef, useContext, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CalendarIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { api } from '~/utils/api';
import { ModalStateEnum, Person, useModalStore } from '~/store/store';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import clsx from 'clsx';

interface MessageBoxProps {
  selectedPerson: Person;
  defaultMessageValue?: string;
}

export default function MessageBox({ selectedPerson, defaultMessageValue }: MessageBoxProps) {
  const [messageDate, setStartDate] = useState<Date | null>(null);

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

  const TimePickerButton = forwardRef(
    (
      { value, onClick }: { value?: ReactNode; onClick?: () => void },
      ref: LegacyRef<HTMLButtonElement>,
    ) => {
      return (
        <button
          className="mt-3 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
          onClick={onClick}
          ref={ref}
        >
          {value || 'Pick a time to send'}
        </button>
      );
    },
  );

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
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <h3 className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0">
            {`Schedule a birthday message for ${selectedPerson.name.split(' ')[0]}!`}
          </h3>
        </div>
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
          <DatePicker
            selected={messageDate}
            onChange={(date: Date) => setStartDate(date)}
            timeInputLabel="Time:"
            dateFormat="dd/MM/yyyy h:mm aa"
            showTimeInput
            showPopperArrow={false}
            customInput={<TimePickerButton />}
          />
        </div>

        <div className="flex items-center justify-end space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                sendMessage();
              }}
              className={clsx(
                ' inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ',
                {
                  'opacity-30': messageDate == null,
                },
              )}
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
