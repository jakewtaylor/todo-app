import React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import { Card } from './Card';
import { CreateCard } from './CreateCard';

type Props = {
  columnId: number;
};

export const Cards: React.FC<Props> = ({ columnId }) => {
  const cards = useSelector((state: StoreState) =>
    state.cards.cards
      .filter(card => card.column_id === columnId)
      .sort((a, b) => a.updated_at.localeCompare(b.updated_at)),
  );

  return (
    <div className="w-full flex flex-col">
      {cards.map(card => (
        <Card key={card.id} card={card} />
      ))}

      <CreateCard columnId={columnId} />
    </div>
  );
};
