/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ChevronDownIcon } from '@heroicons/react/solid';

import FolderSelector from './components/FolderSelector';
import Select from './components/Select';
import SwitchInput from './components/Switch';
import Tabs from './components/Tabs';
import Notes from './components/texts/Notes';
import Work from './components/texts/Work';
import HowTo from './components/texts/HowTo';
import Header from './components/texts/Header';
import OutputType from './components/OutputType';
import Loader from './components/loader/Loader';

const tabs = [
  { name: 'Stellaris', id: 1 },
  { name: 'Crusader King 3', id: 2 },
  { name: 'Europa Universalis 3', id: 3 },
  { name: 'Heart of iron 4', id: 4 }
  // { name: 'Victoria 2' , id: 6 },
  // { name: 'Imperator Rome', id: 5 }
];

const outputOptions = [
  { id: 1, name: 'Add to current mod(s)', available: true },
  { id: 2, name: 'Extract to folder', available: false },
  { id: 3, name: 'Create translation mod', available: false }
];

function App() {
  const [game, setGame] = useState(1);
  const [output, setOutput] = useState(outputOptions[0]);
  const [path, setPath] = useState('');
  const [outputLanguages, setOutputLanguages] = useState({
    english: false,
    french: false,
    german: false,
    spanish: false,
    russian: false,
    chinese: false,
    portugese: false,
    polish: false
  });
  // const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(window.ipcRenderer);

  const toggleLanguage = (language: string) => {
    setOutputLanguages({ ...outputLanguages, [language]: !outputLanguages[language] });
  };
  console.log(outputLanguages);

  const changeGame = (id: number) => {
    console.log(id);
    setGame(id);
  };
  useEffect(() => {
    window.Main.on('translate', (result) => {
      console.log(result);
      setLoading(false);
      toast.success('Sucessfully Translated', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // if (path === '') {
    //   // setError('Empty Path');
    //   toast.error(<div className="text-red-900">Empty path</div>, {
    //     position: 'top-right',
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined
    //   });
    //   return;
    // }
    const request = {
      game,
      path,
      output: output.id ?? 1,
      outputLanguages
    };
    if (window.Main) {
      setLoading(true);
      window.Main.LaunchTranslation(request);
    }
    console.log(request);
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
      <div
        className="w-full text-gray-300"
        style={{ backgroundImage: currentImg(game), backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="flex h-full flex-col items-center justify-center space-y-4 bg-slate-800/50 px-8 py-4">
          <Header />
          <Tabs tabs={tabs} current={game} setGame={changeGame} />
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
                      <Work />
                      <Notes />
                    </div>
                    <HowTo />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
          <form id="form" onSubmit={handleSubmit} className="flex w-full flex-col items-center space-y-4">
            <div className="flex w-full justify-between gap-x-10">
              <div className="w-7/12 rounded-lg bg-slate-900/75 p-4 backdrop-blur-sm">
                <FolderSelector path={path} setPath={setPath} />
                <OutputType mem={output} setMem={setOutput} options={outputOptions} />

                <div className="mt-2 space-y-2">
                  <Disclosure>
                    {({ open }: any) => (
                      <>
                        <Disclosure.Button className="flex items-center py-2 text-lg font-semibold">
                          <ChevronDownIcon className={`mr-2 h-5 w-5 ${open ? 'rotate-180' : ''}`} />
                          Options
                        </Disclosure.Button>

                        <Disclosure.Panel className="text-gray-500">
                          <div>Soon</div>
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
                    <SwitchInput label="French" onClick={() => toggleLanguage('french')} />
                    <SwitchInput label="German" onClick={() => toggleLanguage('german')} />
                    <SwitchInput label="Spanish" onClick={() => toggleLanguage('spanish')} />
                    <SwitchInput label="Russian" onClick={() => toggleLanguage('russian')} />
                    <SwitchInput label="Chinese" onClick={() => toggleLanguage('chinese')} />
                    <SwitchInput label="Portugese" onClick={() => toggleLanguage('portugese')} />
                    <SwitchInput label="Polish" onClick={() => toggleLanguage('polish')} />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-lg border border-transparent bg-amber-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              {loading ? <Loader /> : 'Translate '}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        transition={Slide}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
