import React from 'react';
import { Column } from '../../types';
import { Cards } from '../Cards/Cards';

type Props = {
  columns: Column[];
};

export const Columns: React.FC<Props> = ({ columns }) => {
  return (
    <div className="flex-1 flex flex-row overflow-x-scroll p-1">
      {columns.map(({ id, name }) => (
        <div key={id} className="flex-shrink-0 w-full max-w-xs p-2 mr-1">
          <h2 className="text-lg font-extrabold mb-2 text-gray-700">{name}</h2>

          <Cards columnId={id} />
        </div>
      ))}
    </div>
  );
};
