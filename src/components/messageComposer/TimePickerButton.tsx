import { LegacyRef, ReactNode, forwardRef } from 'react';

export const TimePickerButton = forwardRef(
  (
    { value, onClick }: { value?: ReactNode; onClick?: () => void },
    ref: LegacyRef<HTMLButtonElement>,
  ) => (
    <button
      type="button"
      className="mt-3 inline-flex justify-center rounded-md bg-white px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
      onClick={onClick}
      ref={ref}
    >
      {value || 'Pick a time to send'}
    </button>
  ),
);
