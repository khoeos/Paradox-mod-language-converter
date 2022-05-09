/* eslint-disable no-octal-escape */
import React, { useEffect, useState } from 'react';
import { FolderOpenIcon } from '@heroicons/react/solid';

export default function FolderSelector() {
  const [path, setPath] = useState('');

  useEffect(() => {
    window.Main.on('folder', (result) => setPath(result.filePaths[0]));
  });

  const viewFile = () => {
    if (window.Main) {
      window.Main.searchFolder();
    }
  };

  return (
    <div className="relative mt-1 w-full rounded-md bg-slate-900 shadow-sm">
      <div className="absolute inset-y-0 left-0 flex items-center ">
        <label htmlFor="folder-type" className="sr-only">
          Folder-type
        </label>
        <select
          id="Folder-type"
          name="Folder-type"
          className="h-full rounded-md border-transparent bg-slate-800 bg-transparent py-0 pl-3 pr-7 text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option>Mod Folder</option>
          <option>Single File</option>
        </select>
      </div>
      <input
        type="text"
        name="folder"
        id="folder"
        value={path}
        onChange={(e) => setPath(e.target.value)}
        className="block w-full rounded-md border-transparent bg-slate-800 pr-10 pl-28 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="C:\Program Files (x86)\Steam\steamapps\workshop\content\281990"
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <FolderOpenIcon
          onClick={() => viewFile()}
          className="mr-2 h-6 w-6 flex-shrink-0 cursor-pointer text-gray-300"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
