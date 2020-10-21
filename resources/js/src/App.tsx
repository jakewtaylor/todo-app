import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Board } from './components/Board/Board';
import { Boards } from './components/Boards/Boards';
import { StoreState } from './store/store';

type Props = {
  store: Store<StoreState>;
};

export const App: React.FC<Props> = ({ store }) => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className="h-full flex flex-col md:flex-row">
          <Boards />

          <Board />
        </div>
      </DndProvider>
    </Provider>
  );
};
