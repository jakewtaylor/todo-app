import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { Card, FullColumn } from '../../types';
import { get, post } from '../../utils/http';
import { AppThunk } from '../store';

type CardsState = {
  cards: (Omit<Card, 'id'> & { id: string | number; persisted: boolean })[];
};

const initialState: CardsState = { cards: [] };

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCards(state, action: PayloadAction<Card[]>) {
      state.cards = [
        ...state.cards,
        ...action.payload.map(card => ({ ...card, persisted: true })),
      ];
    },

    createCard(
      state,
      action: PayloadAction<{
        id: string;
        columnId: number;
        title: string;
        body: string;
      }>,
    ) {
      const { id, columnId, title, body } = action.payload;

      state.cards = [
        ...state.cards,
        {
          id,
          column_id: columnId,
          title,
          body,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          persisted: false,
        },
      ];
    },

    cardCreateFailed(state, action: PayloadAction<string>) {
      state.cards = state.cards.filter(c => c.id !== action.payload);
    },

    persistedCard(state, action: PayloadAction<{ id: string; card: Card }>) {
      const { id, card } = action.payload;
      const cardIndex = state.cards.findIndex(c => c.id === id);

      state.cards[cardIndex] = {
        ...state.cards[cardIndex],
        ...card,
        persisted: true,
      };
    },
  },
});

export const {
  addCards,
  createCard,
  cardCreateFailed,
  persistedCard,
} = cardsSlice.actions;

export const makeCard = (
  columnId: number,
  title: string,
  body: string,
): AppThunk => async dispatch => {
  const id = uuid();
  dispatch(createCard({ id, columnId, title, body }));

  try {
    const res = await post<Card>(`/api/columns/${columnId}/cards`, {
      title,
      body,
    });

    dispatch(persistedCard({ id, card: res }));
  } catch (e) {
    dispatch(cardCreateFailed(id));

    throw new Error('Failed to create card.');
  }
};
