import { format, parseISO } from 'date-fns';
import React, { forwardRef } from 'react';
import { StoreCard } from '../../store/cards/cards';
import { CardLayout } from './CardLayout';

type Props = {
  card: StoreCard;
  onEdit(card: StoreCard): any;
};

export const ViewCard = forwardRef<HTMLDivElement, Props>(
  ({ card, onEdit }, ref) => {
    return (
      <CardLayout ref={ref} loading={!card.persisted}>
        <p className="text-xs text-gray-600 mb-2 leading-none">
          {format(parseISO(card.updated_at), 'EEEE do MMMM, HH:mm')}
        </p>
        <p className="font-bold text-base leading-none text-indigo-900">
          {card.title}
        </p>
        {card.body ? (
          <p className="text-gray-800 text-sm truncate-4-lines leading-tight mt-1">
            {card.body}
          </p>
        ) : null}

        <div className="flex flex-row justify-end mt-1">
          <button
            className="text-sm font-semibold text-indigo-500 leading-none hover:bg-indigo-100 py-2 px-3 rounded-sm"
            onClick={() => onEdit(card)}
          >
            Edit
          </button>
        </div>
      </CardLayout>
    );
  },
);
