import { Menu } from '@headlessui/react';
import {
  BarsArrowUpIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  PhoneIcon,
} from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { ModalStateEnum, useModalStore } from '~/store/store';
import { api } from '~/utils/api';

export function MessageList() {
  const messages = api.messages.getAll.useQuery().data;

  const { setModalState, toggleModal, setSelectedPerson } = useModalStore();

  return (
    <div className="bg-white lg:min-w-0 lg:flex-1 lg:overflow-y-scroll">
      <div className="border-b border-t border-gray-200 pb-4 pl-4 pr-6 pt-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6">
        <div className="flex items-center">
          <h1 className="flex-1 text-lg font-medium">Scheduled Messages</h1>
          <Menu as="div" className="relative">
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <BarsArrowUpIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              Sort
              <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      )}
                    >
                      Name
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      )}
                    >
                      Date modified
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      )}
                    >
                      Date created
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>
      <div className="overflow-y-scroll bg-white shadow sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {messages?.map((message) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              key={message.recipient_name}
              onClick={() => {
                setSelectedPerson({
                  id: 1,
                  name: message.recipient_name ?? '', // TODO : Ensure name here
                  phone: 'stringnumber',
                  email: 'stringnumber',
                  role: 'stringnumber',
                  url: 'stringnumber',
                  profileUrl: 'stringnumber',
                  imageUrl: 'stringnumber',
                });
                setModalState(ModalStateEnum.MessageBox);
                toggleModal();
              }}
            >
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="flex-shrink-0">
                    {/* <Image
                      className="h-12 w-12 rounded-full"
                      src={message.applicant.imageUrl}
                      alt=""
                      height={48}
                      width={48}
                    /> */}
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="truncate text-sm font-medium text-indigo-800">
                        {message.recipient_name}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <PhoneIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="truncate">{message.recipient_number}</span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="text-sm text-gray-900">
                          Birthday on {message.send_timestamp}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <CheckCircleIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                            aria-hidden="true"
                          />
                          {message.channel}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
