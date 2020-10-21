import React from 'react';
import { DragObjectWithType, useDrop } from 'react-dnd';
import { moveCard, StoreCard } from '../../store/cards/cards';
import { useDispatch } from '../../store/store';
import { Column as IColumn, DragItem } from '../../types';
import { Cards } from '../Cards/Cards';

type Props = {
  column: IColumn;
};

export const Column: React.FC<Props> = ({ column }) => {
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: DragItem.Card,
    drop: ({ card }: DragObjectWithType & { card: StoreCard }) => {
      if (card.column_id === column.id) return;

      dispatch(moveCard(card, column.id));
    },
  });

  return (
    <div ref={drop} className="flex-shrink-0 w-full max-w-xs p-2 mr-1">
      <h2 className="text-lg font-extrabold mb-2 text-gray-700">
        {column.name}
      </h2>

      <Cards columnId={column.id} />
    </div>
  );
};
