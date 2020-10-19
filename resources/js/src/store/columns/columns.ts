import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Column } from '../../types';

type ColumnState = {
  columns: Column[];
};

const initialState: ColumnState = { columns: [] };

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addColumns(state, action: PayloadAction<Column[]>) {
      state.columns = [...state.columns, ...action.payload];
    },
  },
});

export const { addColumns } = columnsSlice.actions;
