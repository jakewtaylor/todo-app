import React from 'react';
import { Provider } from 'react-redux';
import { Board } from './components/Board/Board';
import { Boards } from './components/Boards/Boards';
import { Columns } from './components/Columns/Columns';
import { store } from './store/store';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="h-full flex flex-row">
        <Boards />

        <Board />
      </div>
    </Provider>
  );
};
