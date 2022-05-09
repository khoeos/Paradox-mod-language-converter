/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';

import { ChevronDownIcon } from '@heroicons/react/solid';
import FolderSelector from './components/FolderSelector';
import RadioInput from './components/RadioInput';
import Select from './components/Select';
import SwitchInput from './components/Switch';
import Tabs from './components/Tabs';

const tabs = [
  { name: 'Stellaris', id: 1 },
  { name: 'Crusader King 3', id: 2 },
  { name: 'Europa Universalis 3', id: 3 },
  { name: 'Heart of iron 4', id: 4 }
  // { name: 'Victoria 2' , id: 6 },
  // { name: 'Imperator Rome', id: 5 }
];

const outputOptions = [
  { name: 'Add to current mod(s)', available: true },
  { name: 'Extract to folder', available: false },
  { name: 'Create translation mod', available: false }
];

function App() {
  const [game, setGame] = useState(1);
  console.log(window.ipcRenderer);

  const changeGame = (id: number) => {
    console.log(id);
    setGame(id);
  };

  const currentImg = (id: number): string => {
    if (game)
      switch (id) {
        case 1:
          return 'url(./assets/stellaris.png)';
        case 2:
          return 'url(./assets/ck3.png)';
        case 3:
          return 'url(./assets/eu4.jpg)';
        case 4:
          return 'url(./assets/hoi4.jpg)';
        case 5:
          return 'url(./assets/imperator.jpg)';
        case 6:
          return 'url(./assets/victoria.jpg)';
        default:
          return '';
      }
    return '';
  };

  return (
    <div className="flex h-screen">
      <button className="absolute top-10 right-5 inline-flex items-center justify-center rounded-full  border border-amber-600 bg-transparent px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
        Github
      </button>
      <div
        className="w-full text-gray-300"
        style={{ backgroundImage: currentImg(game), backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="flex h-full flex-col items-center justify-center space-y-4 bg-slate-800/50 px-8 py-4">
          <div className="text-white">
            <h1 className="text-4xl font-bold ">Paradox Mod Language Converter</h1>
            <p className="font-light opacity-50">Formerly paradox localization converter</p>
          </div>
          <Tabs tabs={tabs} current={game} setGame={changeGame} />
          <form id="form" className="flex w-full flex-col items-center space-y-4">
            <div className=" w-full rounded-lg bg-slate-900/75 p-4 text-sm backdrop-blur-sm">
              <Disclosure>
                {({ open }: any) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center py-2 text-lg font-semibold">
                      <ChevronDownIcon className={`mr-2 h-5 w-5 ${open ? 'rotate-180' : ''}`} />
                      Infos & How to
                    </Disclosure.Button>

                    <Disclosure.Panel className="flex gap-4 text-gray-300">
                      <div className="w-5/12 space-y-4">
                        <div className="space-y-2">
                          <h2 className="text-lg font-semibold text-white">How it work</h2>
                          <p>
                            You can learn more in the github readme accessible with the button in the top right corner.
                          </p>
                          <p>
                            But to explain it simply, this app generate language file from the source language to your
                            desired language to avoid translation tag in game
                          </p>
                          <p>
                            It not translate the mods from one language to another, only generate localisation files
                            based of the source language.
                          </p>
                          <p>
                            If the localisation file is defined, even if it's uncomplete, this app will ignore it and
                            don't generate loc. file by default
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h2 className="text-lg font-semibold text-white">Limitations and notes</h2>
                          <div className="space-y-1">
                            <p>
                              I've see multiple mods using folders like synced_localisation or replace folders, the
                              scrip will ignore theses folders for now.
                            </p>
                            <p>
                              This tool is mainly tested with stellaris, i've tested it with eu4 and ck3, but with fewer
                              mods/usecase and not personnaly tested with hoi4, imperator rome and victoria 2, the logic
                              is the same so there should be no problems but for some specific case it may not work.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="">
                        <h2 className="text-lg font-semibold text-white">How to use it</h2>
                        <ol className="list-decimal space-y-2 pl-6">
                          <li>Select your game on the top</li>
                          <li>
                            If you want to translate all your mods within the steam workshop / paradox mod folder, leave
                            the select on "mod Folder"
                          </li>
                          <li>Select or enter the root folder (if mod folder) or the specific mod folder.</li>
                          <li>
                            Select the source language, then the output languages, you can choose as many as you want
                          </li>
                          <li>
                            You can change the output type :
                            <ul className="list-disc space-y-1 pl-4">
                              <li>
                                <strong>Add to current mod :</strong> Create new files directly into the actual mod
                                folder, and create a .addedFile in the root of each mods with the list of the new files.
                              </li>
                              <li>
                                <strong>Extract to folder :</strong> Extract all new files to a specified folder (use it
                                for create translation mod, or for single mod). You can set multiple extract options
                              </li>
                              <li>
                                <strong>Create translation mod :</strong> Not available now, the goal is to
                                automatically create a new translation patch mod{' '}
                              </li>
                            </ul>
                          </li>
                          <li>
                            You can also add several options :
                            <ul className="list-disc space-y-1 pl-6">
                              <li>
                                <strong>Force generate files :</strong> Even if a localisation file of your desired
                                language exist, it will create a new one (choose extract to folder to avoid file
                                deletion)
                              </li>
                            </ul>
                          </li>
                        </ol>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>

            <div className="flex w-full justify-between gap-x-10">
              <div className="w-7/12 rounded-lg bg-slate-900/75 p-4 backdrop-blur-sm">
                <label className="text-lg font-semibold" htmlFor="folder">
                  Mod(s) folder
                </label>
                <div className="mt-2 flex flex-col">
                  <div className="mt-2 flex w-full gap-x-2">
                    <FolderSelector />
                  </div>
                </div>
                <div className="mt-4">
                  <RadioInput options={outputOptions} />
                </div>

                <div className="mt-2 space-y-2">
                  <Disclosure>
                    {({ open }: any) => (
                      <>
                        <Disclosure.Button className="flex items-center py-2 text-lg font-semibold">
                          <ChevronDownIcon className={`mr-2 h-5 w-5 ${open ? 'rotate-180' : ''}`} />
                          Options
                        </Disclosure.Button>

                        <Disclosure.Panel className="text-gray-500">
                          <div>test</div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>

              <div className="space-y-2 rounded-lg bg-slate-900/75 p-4 backdrop-blur-sm">
                <div>
                  <p className="text-lg font-semibold">Source Language</p>
                  <Select
                    options={['English', 'French', 'German', 'Spanish', 'Russian', 'Chinese', 'Portugese', 'Polish']}
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold">Output language</p>
                  <div className="win-w-max mt-2 grid grid-cols-4 items-center gap-x-3 gap-y-2">
                    <SwitchInput label="English" disabled />
                    <SwitchInput label="French" />
                    <SwitchInput label="German" />
                    <SwitchInput label="Spanish" />
                    <SwitchInput label="Russian" />
                    <SwitchInput label="Chinese" />
                    <SwitchInput label="Portugese" />
                    <SwitchInput label="Polish" />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-lg border border-transparent bg-amber-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Translate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
