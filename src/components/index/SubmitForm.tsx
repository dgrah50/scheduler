import { Fragment, SetStateAction, useState } from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { UsersIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { useModalStore } from '~/store/store';
import MessageBox from './MessageBox';

const people = [
  {
    id: 1,
    name: 'Leslie Alexander',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Miles Ferguson',
    phone: '1-555-314-1592',
    email: 'milesferguson@example.com',
    role: 'CTO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    name: 'Laura Thompson',
    phone: '1-587-835-9421',
    email: 'laurathompson@example.com',
    role: 'CFO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 4,
    name: 'Sean Cooper',
    phone: '1-724-888-1234',
    email: 'seancooper@example.com',
    role: 'COO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: 5,
    name: 'Samantha Peters',
    phone: '1-678-543-9801',
    email: 'samanthapeters@example.com',
    role: 'VP of Marketing',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl: 'https://i.pravatar.cc/150?img=5',
  },
];

const recent = [people[5], people[4], people[2], people[10], people[16]];

export function SubmitForm() {
  const [query, setQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const { isModalOpen, toggleModal } = useModalStore();

  const filteredPeople = people.filter((person) => {
    return person.name.toLowerCase().includes(query.toLowerCase());
  });

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
              {selectedPerson ? (
                <MessageBox />
              ) : (
                ContactList(setQuery, setSelectedPerson, filteredPeople, query)
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

interface Person {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  url: string;
  profileUrl: string;
  imageUrl: string;
}
const isPerson = (item: Person | undefined): item is Person => {
  return !!item;
};
function ContactList(
  setQuery: { (value: SetStateAction<string>): void; (arg0: string): void },
  setSelectedPerson: { (value: SetStateAction<Person | null>): void; (arg0: Person): void },
  filteredPeople: {
    id: number;
    name: string;
    phone: string;
    email: string;
    role: string;
    url: string;
    profileUrl: string;
    imageUrl: string;
  }[],
  query: string,
) {
  return (
    <Combobox<Person>>
      {({ activeOption }) => (
        <>
          <div className="relative">
            <MagnifyingGlassIcon
              className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <Combobox.Input
              className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              placeholder="Search..."
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          {filteredPeople.length > 0 && (
            <Combobox.Options as="div" static hold className="flex divide-x divide-gray-100">
              <>
                <div
                  className={classNames(
                    'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                    activeOption ? 'sm:h-96' : '',
                  )}
                >
                  {query === '' && (
                    <h2 className="mt-2 mb-4 text-xs font-semibold text-gray-500">
                      Recent searches
                    </h2>
                  )}
                  <div className="-mx-2 text-sm text-gray-700">
                    {(query === '' ? recent : filteredPeople).filter(isPerson).map((person) => (
                      <Combobox.Option
                        as="div"
                        key={person.id}
                        value={person}
                        className={({ active }) =>
                          classNames(
                            'flex cursor-default select-none items-center rounded-md p-2',
                            active && 'bg-gray-100 text-gray-900',
                          )
                        }
                        onClick={(e) => setSelectedPerson(person)}
                      >
                        {({ active }) => (
                          <>
                            <img
                              src={person.imageUrl}
                              alt=""
                              className="h-6 w-6 flex-none rounded-full"
                            />
                            <span className="ml-3 flex-auto truncate">{person.name}</span>
                            {active && (
                              <ChevronRightIcon
                                className="ml-3 h-5 w-5 flex-none text-gray-400"
                                aria-hidden="true"
                              />
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </div>

                  {query == '' && (
                    <>
                      <h2 className="mt-2 mb-4 text-xs font-semibold text-gray-500">
                        Other Contacts
                      </h2>
                      <div className="-mx-2 text-sm text-gray-700">
                        {people
                          .filter(
                            (person) =>
                              !recent
                                .filter(isPerson)
                                .find((recentPerson) => recentPerson.id == person.id),
                          )
                          .map((person) => (
                            <Combobox.Option
                              as="div"
                              key={person.id}
                              value={person}
                              className={({ active }) =>
                                classNames(
                                  'flex cursor-default select-none items-center rounded-md p-2',
                                  active && 'bg-gray-100 text-gray-900',
                                )
                              }
                            >
                              {({ active }) => (
                                <>
                                  <img
                                    src={person.imageUrl}
                                    alt=""
                                    className="h-6 w-6 flex-none rounded-full"
                                  />
                                  <span className="ml-3 flex-auto truncate">{person.name}</span>
                                  {active && (
                                    <ChevronRightIcon
                                      className="ml-3 h-5 w-5 flex-none text-gray-400"
                                      aria-hidden="true"
                                    />
                                  )}
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                      </div>
                    </>
                  )}
                </div>

                {activeOption && (
                  <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                    <div className="flex-none p-6 text-center">
                      <img
                        src={activeOption.imageUrl}
                        alt=""
                        className="mx-auto h-16 w-16 rounded-full"
                      />
                      <h2 className="mt-3 font-semibold text-gray-900">{activeOption.name}</h2>
                      <p className="text-sm leading-6 text-gray-500">{activeOption.role}</p>
                    </div>
                    <div className="flex flex-auto flex-col justify-between p-6">
                      <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                        <dt className="col-end-1 font-semibold text-gray-900">Phone</dt>
                        <dd>{activeOption.phone}</dd>
                        <dt className="col-end-1 font-semibold text-gray-900">URL</dt>
                        <dd className="truncate">
                          <a href={activeOption.url} className="text-indigo-600 underline">
                            {activeOption.url}
                          </a>
                        </dd>
                        <dt className="col-end-1 font-semibold text-gray-900">Email</dt>
                        <dd className="truncate">
                          <a
                            href={`mailto:${activeOption.email}`}
                            className="text-indigo-600 underline"
                          >
                            {activeOption.email}
                          </a>
                        </dd>
                      </dl>
                      <button
                        type="button"
                        className="mt-6 w-full rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Send message
                      </button>
                    </div>
                  </div>
                )}
              </>
            </Combobox.Options>
          )}

          {query !== '' && filteredPeople.length === 0 && (
            <div className="py-14 px-6 text-center text-sm sm:px-14">
              <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
              <p className="mt-4 font-semibold text-gray-900">No people found</p>
              <p className="mt-2 text-gray-500">
                We couldn’t find anything with that term. Please try again.
              </p>
            </div>
          )}
        </>
      )}
    </Combobox>
  );
}
