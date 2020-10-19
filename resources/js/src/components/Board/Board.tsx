import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Store } from 'redux';
import { loadBoard } from '../../store/boards/boards';
import { StoreState, useDispatch } from '../../store/store';
import { Column } from '../../types';
import { Columns } from '../Columns/Columns';

export const Board: React.FC = () => {
  const { selectedBoard } = useSelector((state: StoreState) => state.boards);
  const columns = useSelector((state: StoreState): Column[] =>
    state.columns.columns.filter(col => col.board_id === selectedBoard),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!columns.length && selectedBoard) {
      dispatch(loadBoard(selectedBoard));
    }
  }, [columns, selectedBoard]);

  return <Columns columns={columns} />;
};
