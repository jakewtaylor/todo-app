import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addBoards, fetchBoards, selectBoard } from '../../store/boards/boards';
import { StoreState, useDispatch } from '../../store/store';
import { Board } from '../../types';

export const Boards: React.FC = () => {
  const { selectedBoard, boards } = useSelector(
    (state: StoreState) => state.boards,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedBoard === null) {
      dispatch(fetchBoards());
    }
  }, [selectedBoard]);

  const handleBoardClick = (board: Board) => {
    dispatch(selectBoard(board.id));
  };

  return (
    <div className="bg-indigo-700 p-1">
      {boards.map((board, i) => (
        <button
          key={board.id}
          onClick={() => handleBoardClick(board)}
          className={`block p-2 w-full text-center rounded-sm hover:bg-indigo-600 ${
            board.id === selectedBoard ? 'bg-indigo-600' : ''
          } ${i !== 0 ? 'mt-1' : ''}`}
        >
          <p className="leading-none text-indigo-100">{board.name}</p>
        </button>
      ))}
    </div>
  );
};
