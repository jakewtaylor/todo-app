import { format, parseISO } from 'date-fns';
import React from 'react';
import { useDrag } from 'react-dnd';
import { StoreCard } from '../../store/cards/cards';
import { DragItem } from '../../types';

type Props = {
  card: StoreCard;
};

export const Card: React.FC<Props> = ({ card }) => {
  const [, drag] = useDrag({
    item: {
      type: DragItem.Card,
      card,
    },
    canDrag: card.persisted,
  });

  return (
    <div
      ref={drag}
      className={`bg-white shadow p-3 rounded mb-4 ${
        card.persisted ? '' : 'opacity-75 cursor-wait'
      }`}
    >
      <p className="text-xs text-gray-600 mb-2 leading-none">
        {format(parseISO(card.updated_at), 'EEEE do MMMM, HH:mm')}
      </p>
      <p className="font-bold leading-none text-gray-800">{card.title}</p>
      {card.body ? (
        <p className="text-gray-800 truncate-4-lines leading-tight mt-1">
          {card.body}
        </p>
      ) : null}
    </div>
  );
};
