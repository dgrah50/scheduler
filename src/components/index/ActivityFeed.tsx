import Image from 'next/image';
import { activityItems } from './index';

export function ActivityFeed() {
  return (
    <div className="bg-gray-50 pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 lg:pr-8 xl:pr-0">
      <div className="pl-6 lg:w-80">
        <div className="pb-2 pt-6">
          <h2 className="text-sm font-semibold">Activity</h2>
        </div>
        <div>
          <ul className="divide-y divide-gray-200">
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
            <button type="button" className="font-semibold text-indigo-700 hover:text-indigo-900">
              View all activity
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
