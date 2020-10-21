import Echo from 'laravel-echo';
import { Store } from 'redux';
import io from 'socket.io-client';
import { liveCardCreate, liveCardUpdate } from './store/cards/cards';
import { StoreState } from './store/store';
import { Card } from './types';

// @ts-ignore
window.io = io;

type CardEvent = {
  card: Card;
};

export const startListening = (store: Store<StoreState>) => {
  const echo = new Echo({
    broadcaster: 'socket.io',
    host: 'http://localhost:6001',
  });

  echo
    .channel('default')
    .listen('CardUpdated', ({ card }: CardEvent) => {
      store.dispatch(liveCardUpdate(card));
    })
    .listen('CardCreated', ({ card }: CardEvent) => {
      store.dispatch(liveCardCreate(card));
    });
};
