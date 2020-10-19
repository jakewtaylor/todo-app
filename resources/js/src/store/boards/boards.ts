import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Board, Card, Column, FullBoard } from '../../types';
import { get } from '../../utils/http';
import { addCards } from '../cards/cards';
import { addColumns } from '../columns/columns';
import { AppThunk } from '../store';

type BoardState = {
  selectedBoard: number | null;
  boards: Board[];
};

const initialState: BoardState = {
  selectedBoard: null,
  boards: [],
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoards(state, action: PayloadAction<{ boards: Board[] }>) {
      const { boards } = action.payload;

      state.boards.push(...boards);
    },

    selectBoard(state, action: PayloadAction<number>) {
      state.selectedBoard = action.payload;
    },
  },
});

export const { addBoards, selectBoard } = boardsSlice.actions;

export const fetchBoards = (): AppThunk => async dispatch => {
  try {
    const boards = await get<Board[]>('/api/boards');

    dispatch(addBoards({ boards }));
    dispatch(selectBoard(boards[0].id));
  } catch (e) {
    console.warn(e);
  }
};

export const loadBoard = (boardId: number): AppThunk => async dispatch => {
  try {
    const board = await get<FullBoard>(`/api/boards/${boardId}`);

    // remove the 'cards' prop from each column
    const columns: Column[] = board.columns.map(({ cards, ...col }) => col);

    // get all cards as flat array
    const cards = board.columns.reduce(
      (acc, { cards }) => [...acc, ...cards],
      [] as Card[],
    );

    dispatch(addColumns(columns));
    dispatch(addCards(cards));
  } catch (e) {
    console.warn(e);
  }
};
