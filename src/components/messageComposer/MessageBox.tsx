import { useState } from 'react';
import { api } from '~/utils/api';
import { ModalStateEnum, Person, useModalStore } from '~/store/modalStore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import clsx from 'clsx';
import Image from 'next/image';
import { TimePickerButton } from './TimePickerButton';

interface MessageBoxProps {
  selectedPerson: Person;
}

export default function MessageBox({ selectedPerson }: MessageBoxProps) {
  const [messageDate, setStartDate] = useState<Date | null>(null);

  const { setModalState, toggleModal, setSelectedPerson, message, setMessage } = useModalStore();
  const utils = api.useContext();

  const addMessage = api.messages.addOne.useMutation({
    async onSuccess() {
      utils.messages.getAll.invalidate();
      toggleModal();
      setTimeout(() => {
        setSelectedPerson(null);
        setModalState(ModalStateEnum.ContactList);
      }, 500);
    },
  });

  async function sendMessage() {
    if (message !== null) {
      addMessage.mutateAsync({
        channel: 'WhatsApp',
        message,
        recipient_name: selectedPerson.name,
        recipient_number: selectedPerson.phone,
        userId: 1,
      });
    }
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg shadow-sm">
        <div className="flex items-center justify-between space-x-3  py-4">
          <div className="flex">
            <RecipientAvatar selectedPerson={selectedPerson} />
          </div>
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={() => {
                setModalState(ModalStateEnum.ContactList);
              }}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
            >
              Back
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            rows={2}
            name="message"
            id="message"
            className=" h-56 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={`Happy birthday, ${selectedPerson.name.split(' ')[0]}!`}
            value={message || ''}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-px bottom-0">
        <div className="flex items-center justify-end space-x-3  px-2 py-2 sm:px-3">
          <DatePicker
            selected={messageDate}
            onChange={(date: Date) => setStartDate(date)}
            timeInputLabel="Time:"
            dateFormat="dd/MM/yyyy h:mm aa"
            showTimeInput
            showPopperArrow={false}
            customInput={<TimePickerButton />}
          />
          <div className="flex-shrink-0">
            <button
              type="button"
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
          <Image
            className="inline-block h-9 w-9 rounded-full"
            src={selectedPerson.imageUrl}
            alt=""
            width="36"
            height="36"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-foreground group-hover:text-gray-900">
            {selectedPerson.name}
          </p>
        </div>
      </div>
    </a>
  );
}
