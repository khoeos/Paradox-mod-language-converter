import React from 'react';

export default function Select({ options }: { options: string[] }) {
  return (
    <div>
      <label htmlFor="location" className="block hidden text-sm font-medium text-gray-700">
        Location
      </label>
      <select
        id="location"
        name="location"
        className="mt-1 block w-full cursor-not-allowed rounded-md border-gray-300 bg-slate-800 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        defaultValue="English"
        disabled
      >
        {options.map((option: string) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
