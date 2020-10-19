import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from '../../types';

type CardsState = {
  cards: Card[];
};

const initialState: CardsState = { cards: [] };

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCards(state, action: PayloadAction<Card[]>) {
      state.cards = [...state.cards, ...action.payload];
    },
  },
});

export const { addCards } = cardsSlice.actions;
