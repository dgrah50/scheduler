import { Menu, Transition } from '@headlessui/react';
import { CheckBadgeIcon, RectangleStackIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { Fragment } from 'react';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import { useModalStore } from '~/store/store';

export function ProfileSection() {
  const { data: sessionData } = useSession();
  const messages = api.messages.getAll.useQuery().data ?? [];
  const { isModalOpen, toggleModal } = useModalStore();

  return (
    <div className="bg-white xl:w-64 xl:flex-shrink-0 xl:border-r xl:border-gray-200">
      <div className="py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-8">
            <div className="space-y-8 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-8">
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
                      <Menu.Item key={'Profile'}>
                        {({ active }) => (
                          <a
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            {'Profile'}
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item key={'Settings'}>
                        {({ active }) => (
                          <a
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            {'Settings'}
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item key={'profile'}>
                        {({ active }) => (
                          <a
                            href={`/api/auth/signout`}
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
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-900">{sessionData?.user.name}</div>
                </div>
              </div>
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row xl:flex-col">
                <button
                  onClick={toggleModal}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md bg-indigo-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure-radiance-600 xl:w-full"
                >
                  New Message
                </button>
              </div>
            </div>
            {/* Meta info */}
            <div className="flex flex-col space-y-6 sm:flex-row sm:space-x-8 sm:space-y-0 xl:flex-col xl:space-x-0 xl:space-y-6">
              <div className="flex items-center space-x-2">
                <CheckBadgeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                <span className="text-sm font-medium text-gray-500">Pro Member</span>
              </div>
              <div className="flex items-center space-x-2">
                <RectangleStackIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                <span className="text-sm font-medium text-gray-500">
                  {messages.length} messages scheduled
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
