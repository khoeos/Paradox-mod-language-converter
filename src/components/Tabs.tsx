import React from 'react';
import classNames from '../utils/classNames';

export default function Tabs({
  tabs,
  current,
  setGame
}: {
  tabs: { name: string; id: number }[];
  current: number;
  setGame: any;
}) {
  return (
    <div className="flex w-full justify-center rounded-lg bg-slate-900/75 p-4 backdrop-blur-sm">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab: { id: number; name: string }) => (
            <button
              onClick={() => setGame(tab.id)}
              key={tab.name}
              className={classNames(
                current === tab.id
                  ? 'border-amber-600 text-amber-400'
                  : 'border-transparent text-gray-200 hover:border-white hover:text-white',
                'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
              )}
            >
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
