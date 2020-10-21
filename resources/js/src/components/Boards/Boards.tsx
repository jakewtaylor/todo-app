import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchBoards, selectBoard } from '../../store/boards/boards';
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
    <div className="bg-indigo-700 w-full md:w-48 flex flex-row md:flex-col">
      <div className="p-2 md:pb-0">
        <h6 className="text-sm font-bold text-indigo-300 mb-0 md:mb-1">
          Boards
        </h6>
      </div>

      {boards.map((board, i) => (
        <button
          key={board.id}
          onClick={() => handleBoardClick(board)}
          className={`
            relative block p-2 px-4 md:px-2 md:w-full h-full md:h-auto text-left

            md:hover:bg-indigo-600 font-semibold text-indigo-200 focus:outline-none ${
              board.id === selectedBoard
                ? 'bg-indigo-600 border-t-4 md:border-t-0 md:border-l-4 pt-1 md:pt-2 md:pl-1 border-indigo-500 text-indigo-100'
                : ''
            } ${i !== 0 ? 'md:mt-1' : ''} leading-none `}
        >
          {board.name}

          {board.id === selectedBoard ? (
            <div className="absolute inset-y-0 right-0 items-center hidden md:flex">
              <div className="w-4 h-4 rounded-full bg-gray-200 transform translate-x-2" />
            </div>
          ) : null}
        </button>
      ))}
    </div>
  );
};
