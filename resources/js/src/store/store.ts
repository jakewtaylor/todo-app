import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { useDispatch as useLibDispatch } from 'react-redux';
import { boardsSlice } from './boards/boards';
import { cardsSlice } from './cards/cards';
import { columnsSlice } from './columns/columns';

const reducer = combineReducers({
  boards: boardsSlice.reducer,
  columns: columnsSlice.reducer,
  cards: cardsSlice.reducer,
});

export const store = configureStore({
  reducer,
});

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, StoreState, unknown, Action<string>>;

export const useDispatch = () => useLibDispatch<AppDispatch>();
