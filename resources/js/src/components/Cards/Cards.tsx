import React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/store';

type Props = {
  columnId: number;
};

export const Cards: React.FC<Props> = ({ columnId }) => {
  const cards = useSelector((state: StoreState) =>
    state.cards.cards.filter(card => card.column_id === columnId),
  );

  return (
    <div className="w-full flex flex-col">
      {cards.map(({ id, title, body }) => (
        <div key={id} className="bg-white shadow p-3 rounded mb-4">
          <p className="font-bold leading-none mb-2 text-gray-800">{title}</p>
          <p className="text-gray-800 truncate-4-lines leading-tight">{body}</p>
        </div>
      ))}
    </div>
  );
};
