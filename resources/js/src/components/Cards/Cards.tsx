import React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import { CreateCard } from './CreateCard';

type Props = {
  columnId: number;
};

export const Cards: React.FC<Props> = ({ columnId }) => {
  const cards = useSelector((state: StoreState) =>
    state.cards.cards.filter(card => card.column_id === columnId),
  );

  return (
    <div className="w-full flex flex-col">
      {cards.map(({ id, title, body, persisted }) => (
        <div
          key={id}
          className={`bg-white shadow p-3 rounded mb-4 ${
            persisted ? '' : 'opacity-75 cursor-wait'
          }`}
        >
          <p className="font-bold leading-none text-gray-800">{title}</p>
          {body ? (
            <p className="text-gray-800 truncate-4-lines leading-tight mt-2">
              {body}
            </p>
          ) : null}
        </div>
      ))}

      <CreateCard columnId={columnId} />
    </div>
  );
};
