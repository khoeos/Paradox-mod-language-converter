/* eslint-disable react/no-unescaped-entities */

import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import Loader from './loader/Loader';

export default function Modal({ open }: { open: boolean }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <div className="relative z-10">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
              <div className="relative inline-block transform overflow-hidden rounded-lg bg-slate-800 px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6 sm:align-middle">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full">
                    <Loader />
                  </div>
                  <div className="mt-3 sm:mt-5">
                    <div className="text-center text-lg font-medium leading-6 text-white">
                      Conversion in progress
                      <span className="block text-sm font-normal text-slate-200">Try to not click during it</span>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-white">
                        If the app turn into "not responding" mode, don't close it, as long as you see the spinner, the
                        execution is in progress.
                        <br /> <br /> The process can last few minutes depending on your processor and the number of
                        mods
                      </p>
                    </div>
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
