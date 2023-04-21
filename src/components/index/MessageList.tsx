import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { CheckCircleIcon, PhoneIcon } from '@heroicons/react/20/solid';
import { unixToDDMMYYYY, useIsMobile } from '~/lib/utils';
import { ModalStateEnum, useModalStore } from '~/store/modalStore';

import { api } from '~/utils/api';
import { signOut, useSession } from 'next-auth/react';
import { Fragment } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function MessageList() {
  const messages = api.messages.getAll.useQuery().data;

  const { setModalState, toggleModal, setSelectedPerson, setMessage } = useModalStore();

  return (
    <div className="message-list">
      <div className="sticky top-40">
        <Header />
        <div className="overflow-y-scroll ">
          <ul className="divide-y border">
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
                    imageUrl: 'https://i.pravatar.cc/150?img=2',
                  });
                  setMessage(message.msg_text ?? '');
                  setModalState(ModalStateEnum.MessageBox);
                  toggleModal();
                }}
              >
                <div className="flex items-center  px-4 py-4 sm:px-6">
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
                        <p className="text-md truncate font-medium ">{message.recipient_name}</p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <PhoneIcon
                            className="mr-1.5 h-4 w-4 flex-shrink-0 text-muted-foreground"
                            aria-hidden="true"
                          />
                          <span className="truncate">{message.recipient_number}</span>
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Birthday on {unixToDDMMYYYY(message.send_timestamp ?? 1682098342)}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            {message.channel}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <CheckCircleIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const isMobile = useIsMobile();
  console.log(
    '%cMessageList.tsx line:89 isMobile',
    'color: white; background-color: #007acc;',
    isMobile,
  );
  const { data: sessionData } = useSession();
  const { setModalState, toggleModal } = useModalStore();

  return (
    <div className="sticky top-0 z-10  border-x   backdrop-blur-md">
      <div className="sticky flex flex-col items-center lg:top-0">
        {isMobile && (
          <div className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full bg-background/95 p-4 pb-0 shadow-sm backdrop-blur">
            <div className="flex justify-between">
              {/* Profile */}
              <div className="flex items-center space-x-3">
                <Menu as="div" className="relative ml-4 flex-shrink-0">
                  <div>
                    <Menu.Button className="flex rounded-full bg-indigo-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-12 w-12 rounded-full"
                        src={sessionData?.user.image ?? ''}
                        alt=""
                        height={48}
                        width={48}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item key="Profile">
                        {({ active }) => (
                          <a
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item key="Settings">
                        {({ active }) => (
                          <a
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item key="profile">
                        {({ active }) => (
                          <Link
                            href="/api/auth/signout"
                            onClick={(e) => {
                              e.preventDefault();
                              signOut();
                            }}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            Sign Out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <div className="space-y-1">
                  <div className="text-sm font-medium">{sessionData?.user.name}</div>
                </div>
              </div>
              {/* Action buttons */}
              <div className="flex flex-col  xl:flex-col">
                <Button
                  onClick={() => {
                    toggleModal();
                    setModalState(ModalStateEnum.MessageBox);
                  }}
                  className="bg-primary"
                >
                  New Message
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className=" pb-4 pl-4 pr-6 pt-4 sm:pl-6 lg:pl-8  xl:pl-6 xl:pt-6">
          <h1 className="flex-1 text-lg font-medium">Scheduled Messages</h1>
        </div>
      </div>
    </div>
  );
}
