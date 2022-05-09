/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export default function Notes() {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-white">Limitations and notes</h2>
      <div className="space-y-1">
        <p>
          I've see multiple mods using folders like synced_localisation or replace folders, the scrip will ignore theses
          folders for now.
        </p>
        <p>
          This tool is mainly tested with stellaris, i've tested it with eu4 and ck3, but with fewer mods/usecase and
          not personnaly tested with hoi4, imperator rome and victoria 2, the logic is the same so there should be no
          problems but for some specific case it may not work.
        </p>
      </div>
    </div>
  );
}
