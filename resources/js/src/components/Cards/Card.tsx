import { format, parseISO } from 'date-fns';
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { StoreCard } from '../../store/cards/cards';
import { DragItem } from '../../types';
import { EditCard } from './EditCard';
import { ViewCard } from './ViewCard';

type Props = {
  card: StoreCard;
};

export const Card: React.FC<Props> = ({ card }) => {
  const [editing, setEditing] = useState(false);

  const [, drag] = useDrag({
    item: {
      type: DragItem.Card,
      card,
    },
    canDrag: card.persisted && !editing,
  });

  return editing ? (
    <EditCard card={card} onDone={() => setEditing(false)} />
  ) : (
    <ViewCard ref={drag} card={card} onEdit={() => setEditing(true)} />
  );
};
