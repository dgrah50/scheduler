import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { MagnifyingGlassIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { UsersIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { Person } from '~/store/store';
import Image from 'next/image';
import { isPerson } from './index';
import { recent, people } from './mockData';

interface ContactListProps {
  onPersonClick: (value: Person) => void;
}
export function ContactList({ onPersonClick }: ContactListProps) {
  const [query, setQuery] = useState('');

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Combobox<Person>>
      {({ activeOption }) => (
        <>
          <div className="relative">
            <MagnifyingGlassIcon
              className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
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
                    <h2 className="mb-4 mt-2 text-xs font-semibold text-gray-500">
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
                        onClick={() => onPersonClick(person)}
                      >
                        {({ active }) => (
                          <>
                            <Image
                              src={person.imageUrl}
                              alt=""
                              className="h-6 w-6 flex-none rounded-full"
                              width="24"
                              height="24"
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

                  {query === '' && (
                    <>
                      <h2 className="mb-4 mt-2 text-xs font-semibold text-gray-500">
                        Other Contacts
                      </h2>
                      <div className="-mx-2 text-sm text-gray-700">
                        {people
                          .filter(
                            (person) =>
                              !recent
                                .filter(isPerson)
                                .find((recentPerson) => recentPerson.id === person.id),
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
                              onClick={() => onPersonClick(person)}
                            >
                              {({ active }) => (
                                <>
                                  <Image
                                    src={person.imageUrl}
                                    alt=""
                                    className="h-6 w-6 flex-none rounded-full"
                                    width="24"
                                    height="24"
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
                      <Image
                        src={activeOption.imageUrl}
                        alt=""
                        className="mx-auto h-16 w-16 rounded-full"
                        width="24"
                        height="24"
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
                        onClick={() => onPersonClick(activeOption)}
                        className="mt-6 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
            <div className="px-6 py-14 text-center text-sm sm:px-14">
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
