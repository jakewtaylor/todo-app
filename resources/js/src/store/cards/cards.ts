import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { formatISO } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { Card, FullColumn } from '../../types';
import { get, patch, post } from '../../utils/http';
import { AppThunk } from '../store';

export type StoreCard = Omit<Card, 'id'> & {
  id: string | number;
  persisted: boolean;
};

type CardsState = {
  cards: StoreCard[];
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

    updateCard(
      state,
      action: PayloadAction<{
        cardId: string | number;
        updates: {
          id?: number;
          title?: string;
          body?: string;
          columnId?: number;
          persisted?: boolean;
        };
      }>,
    ) {
      const { cardId, updates } = action.payload;
      const cardIndex = state.cards.findIndex(c => c.id === cardId);

      const card = state.cards[cardIndex];
      state.cards[cardIndex] = {
        ...card,
        id: updates.id ?? card.id,
        title: updates.title ?? card.title,
        body: updates.body ?? card.body,
        column_id: updates.columnId ?? card.column_id,
        persisted: updates.persisted ?? card.persisted,
        updated_at: formatISO(new Date()),
      };
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
          created_at: formatISO(new Date()),
          updated_at: formatISO(new Date()),
          persisted: false,
        },
      ];
    },

    removeCard(state, action: PayloadAction<string>) {
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

    liveCardUpdate(state, action: PayloadAction<Card>) {
      const cardIndex = state.cards.findIndex(c => c.id === action.payload.id);

      state.cards[cardIndex] = {
        ...state.cards[cardIndex],
        ...action.payload,
      };
    },

    liveCardCreate(state, action: PayloadAction<Card>) {
      const existingCard = state.cards.find(
        card => card.id === action.payload.id,
      );

      if (existingCard) return;

      state.cards.push({ ...action.payload, persisted: true });
    },
  },
});

export const {
  addCards,
  createCard,
  removeCard,
  persistedCard,
  updateCard,
  liveCardUpdate,
  liveCardCreate,
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

    dispatch(
      updateCard({
        cardId: id,
        updates: { ...res, persisted: true },
      }),
    );
  } catch (e) {
    dispatch(removeCard(id));

    throw new Error('Failed to create card.');
  }
};

export const moveCard = (
  card: StoreCard,
  toColumn: number,
): AppThunk => async dispatch => {
  dispatch(
    updateCard({
      cardId: card.id,
      updates: { columnId: toColumn, persisted: false },
    }),
  );

  try {
    const res = await patch<Card>(`/api/cards/${card.id}`, {
      column_id: toColumn,
    });

    dispatch(
      updateCard({ cardId: card.id, updates: { ...res, persisted: true } }),
    );
  } catch (e) {
    dispatch(
      updateCard({
        cardId: card.id,
        updates: { columnId: card.column_id, persisted: true },
      }),
    );

    throw new Error('Failed to move card.');
  }
};

export const editCard = (
  card: StoreCard,
  title: string,
  body: string,
): AppThunk => async dispatch => {
  dispatch(
    updateCard({
      cardId: card.id,
      updates: { title, body, persisted: false },
    }),
  );

  try {
    const res = await patch<Card>(`/api/cards/${card.id}`, {
      title,
      body,
    });

    dispatch(
      updateCard({ cardId: card.id, updates: { ...res, persisted: true } }),
    );
  } catch (e) {
    dispatch(
      updateCard({
        cardId: card.id,
        updates: { title: card.title, body: card.body, persisted: true },
      }),
    );
  }
};
