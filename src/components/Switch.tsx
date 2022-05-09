/* This example requires Tailwind CSS v2.0+ */
import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import classNames from '../utils/classNames';

export default function SwitchInput({ label, disabled }: { label: string; disabled?: boolean }) {
  // eslint-disable-next-line react/destructuring-assignment
  const [enabled, setEnabled] = useState(disabled ?? false);
  const toggle = () => {
    if (!disabled) {
      setEnabled(!enabled);
    }
  };
  return (
    <Switch.Group>
      <Switch.Label className="mr-4">{label}</Switch.Label>
      <Switch
        checked={enabled}
        onChange={toggle}
        className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full"
      >
        <span className="sr-only">Use setting</span>
        <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-gray-800" />
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'bg-indigo-600' : 'bg-gray-200',
            disabled ? 'bg-gray-600' : '',
            'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
          )}
        />
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            disabled ? 'border-gray-600 bg-gray-400' : 'border-gray-200 bg-white',
            'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border   shadow ring-0 transition-transform duration-200 ease-in-out'
          )}
        />
      </Switch>
    </Switch.Group>
  );
}
