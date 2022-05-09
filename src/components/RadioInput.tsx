/* This example requires Tailwind CSS v2.0+ */
import React, { useState } from 'react';
import { RadioGroup } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function RadioInput({ options }) {
  const [mem, setMem] = useState(options[0]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-gray-300">Output type</h2>
      </div>

      <RadioGroup value={mem} onChange={setMem} className="mt-2">
        <RadioGroup.Label className="sr-only">Output type</RadioGroup.Label>
        <div className="flex gap-4">
          {options.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ active, checked }) =>
                classNames(
                  option.available ? 'cursor-pointer focus:outline-none' : 'cursor-not-allowed opacity-25',
                  active ? 'ring-2 ring-amber-500 ring-offset-2' : '',
                  checked
                    ? 'border-transparent bg-amber-600 text-white hover:bg-amber-700'
                    : 'border-gray-200 bg-slate-700 text-white hover:bg-slate-800',
                  'flex items-center justify-center rounded-md border py-3 px-3 text-sm transition-all sm:flex-1'
                )
              }
              disabled={!option.available}
            >
              <RadioGroup.Label as="p">{option.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
