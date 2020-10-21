import React from 'react';
import { Column as IColumn } from '../../types';
import { Column } from './Column';

type Props = {
  columns: IColumn[];
};

export const Columns: React.FC<Props> = ({ columns }) => (
  <div className="flex-1 flex flex-row overflow-x-scroll p-1">
    {columns.map(column => (
      <Column key={column.id} column={column} />
    ))}
  </div>
);
