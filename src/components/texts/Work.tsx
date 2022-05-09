/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export default function Work() {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-white">How it work</h2>
      <p>
        You can learn more in the github readme : <code>github.com/khoeos/Paradox-mod-language-converter</code>
      </p>
      <p>
        But to explain it simply, this app generate language file from the source language to your desired language to
        avoid translation tag in game
      </p>
      <p>
        It not translate the mods from one language to another, only generate localisation files based of the source
        language.
      </p>
      <p>
        If the localisation file is defined, even if it's uncomplete, this app will ignore it and don't generate loc.
        file by default
      </p>
    </div>
  );
}
