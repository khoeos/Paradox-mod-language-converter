/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export default function HowTo() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white">How to use it</h2>
      <ol className="list-decimal space-y-2 pl-6">
        <li>Select your game on the top</li>
        <li>
          If you want to translate all your mods within the steam workshop / paradox mod folder, leave the select on
          "mod Folder"
        </li>
        <li>Select or enter the root folder (if mod folder) or the specific mod folder.</li>
        <li>Select the source language, then the output languages, you can choose as many as you want</li>
        <li>
          You can change the output type :
          <ul className="list-disc space-y-1 pl-4">
            <li>
              <strong>Add to current mod :</strong> Create new files directly into the actual mod folder, and create a
              .addedFile in the root of each mods with the list of the new files.
            </li>
            <li>
              <strong>Extract to folder :</strong> Extract all new files to a specified folder (use it for create
              translation mod, or for single mod). You can set multiple extract options
            </li>
            <li>
              <strong>Create translation mod :</strong> Not available now, the goal is to automatically create a new
              translation patch mod{' '}
            </li>
          </ul>
        </li>
        <li>
          You can also add several options :
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Force generate files :</strong> Even if a localisation file of your desired language exist, it
              will create a new one (choose extract to folder to avoid file deletion)
            </li>
          </ul>
        </li>
      </ol>
    </div>
  );
}
