import { useState } from 'react';
import { Menu, Disclosure, Transition } from '@headlessui/react';
import {
  CheckBadgeIcon,
  RectangleStackIcon,
  BarsArrowUpIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  Bars3CenterLeftIcon,
  PhoneIcon,
} from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { Fragment } from 'react';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import { Dialog } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Domains', href: '#', current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];
const birthday = [
  {
    applicant: {
      name: 'Janine Cooper',
      email: 'Janine.cooper@example.com',
      imageUrl: 'https://i.pravatar.cc/150?img=1',
    },
    date: '1998-03-06',
    dateFull: 'March 6, 1998',
    stage: 'Scheduled message',
    href: '#',
  },
  {
    applicant: {
      name: 'Kristen Ramos',
      email: 'kristen.ramos@example.com',
      imageUrl: 'https://i.pravatar.cc/150?img=2',
    },
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'Scheduled message',
    href: '#',
  },
  {
    applicant: {
      name: 'Ted Fox',
      email: 'ted.fox@example.com',
      imageUrl: 'https://i.pravatar.cc/150?img=3',
    },
    date: '1978-08-07',
    dateFull: 'August 7, 1978',
    stage: 'Scheduled message',
    href: '#',
  },
  {
    applicant: {
      name: 'Ricardo Fereira',
      email: 'ricardo.fereira@example.com',
      imageUrl: 'https://i.pravatar.cc/150?img=4',
    },
    date: '1998-03-06',
    dateFull: 'March 6, 1998',
    stage: 'Scheduled message',
    href: '#',
  },
  {
    applicant: {
      name: 'Melanie Keysa',
      email: 'Melanie.keysa@example.com',
      imageUrl: 'https://i.pravatar.cc/150?img=5',
    },
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'Scheduled message',
    href: '#',
  },
  {
    applicant: {
      name: 'Jarred Williams',
      email: 'Jarred.william@example.com',
      imageUrl: 'https://i.pravatar.cc/150?img=6',
    },
    date: '1998-09-07',
    dateFull: 'Sept 7, 1998',
    stage: 'Scheduled message',
    href: '#',
  },
  {
    applicant: {
      name: 'Bennett Hunter',
      email: 'bennet.hunter@example.com',
      imageUrl: 'https://i.pravatar.cc/150?img=7',
    },
    date: '1994-12-06',
    dateFull: 'December 6, 1998',
    stage: 'Scheduled message',
    href: '#',
  },
  {
    applicant: {
      name: 'Zeb Tanger',
      email: 'zeb.tanger@example.com',
      imageUrl: 'https://i.pravatar.cc/150?img=8',
    },
    date: '2003-05-09',
    dateFull: 'May 9, 2003',
    stage: 'Scheduled message',
    href: '#',
  },
  {
    applicant: {
      name: 'Hannah Fox',
      email: 'hannah.fox@example.com',
      imageUrl: 'https://i.pravatar.cc/150?img=9',
    },
    date: '1978-08-07',
    dateFull: 'August 7, 1978',
    stage: 'Scheduled message',
    href: '#',
  },
];
const activityItems = [
  { recipient: 'Joe Bloggs', time: '3 days ago' },
  { recipient: 'John Public', time: '2 weeks ago' },
];

export function ActivityFeed() {
  return (
    <div className="bg-gray-50 pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 lg:pr-8 xl:pr-0">
      <div className="pl-6 lg:w-80">
        <div className="pt-6 pb-2">
          <h2 className="text-sm font-semibold">Activity</h2>
        </div>
        <div>
          <ul role="list" className="divide-y divide-gray-200">
            {activityItems.map((item) => (
              <li key={item.recipient} className="py-4">
                <div className="flex space-x-3">
                  <Image
                    className="h-6 w-6 rounded-full"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                    alt=""
                    width="24"
                    height="24"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">You</h3>
                      <p className="text-sm text-gray-500">{item.time}</p>
                    </div>
                    <p className="text-sm text-gray-500">Sent a message to {item.recipient}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 py-4 text-sm">
            <a
              href="#"
              className="font-semibold text-azure-radiance-600 hover:text-azure-radiance-900"
            >
              View all activity
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileSection() {
  const { data: sessionData } = useSession();

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
                    <Menu.Button className="flex rounded-full bg-azure-radiance-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-azure-radiance-700">
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
                  type="button"
                  className="inline-flex items-center justify-center rounded-md bg-azure-radiance-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-azure-radiance-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure-radiance-600 xl:w-full"
                >
                  New Message
                </button>
              </div>
            </div>
            {/* Meta info */}
            <div className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-6">
              <div className="flex items-center space-x-2">
                <CheckBadgeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                <span className="text-sm font-medium text-gray-500">Pro Member</span>
              </div>
              <div className="flex items-center space-x-2">
                <RectangleStackIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                <span className="text-sm font-medium text-gray-500">
                  {birthday.length} messages scheduled
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MessageList() {
  const messages = api.messages.getAll.useQuery().data;

  return (
    <div className="bg-white lg:min-w-0 lg:flex-1 lg:overflow-y-scroll">
      <div className="border-b border-t border-gray-200 pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6">
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
        <ul role="list" className="divide-y divide-gray-200">
          {messages?.map((message) => (
            <li key={message.recipient_name}>
              <a href={'google.com'} className="block hover:bg-gray-50">
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
                        <p className="truncate text-sm font-medium text-azure-radiance-800">
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
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SubmitForm() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: sessionData } = useSession();

  return (
    <header className="bg-white">
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <a
              href="#"
              className="ml-auto rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
