/* eslint-disable react/no-unescaped-entities */

import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import Loader from './loader/Loader';

export default function Modal({ open }: { open: boolean }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <div className="relative z-[100]">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform rounded-lg shadow-xl bg-slate-800 sm:my-8 sm:w-full sm:max-w-xl sm:p-6 sm:align-middle">
                <div>
                  <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full">
                    <Loader />
                  </div>
                  <div className="mt-3 sm:mt-5">
                    <div className="text-lg font-medium leading-6 text-center text-white">Conversion in progress</div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Transition.Root>
  );
}
