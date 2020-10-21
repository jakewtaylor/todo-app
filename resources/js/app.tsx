import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './src/App';
import { startListening } from './src/echo';
import { store } from './src/store/store';

startListening(store);

ReactDOM.render(<App store={store} />, document.getElementById('app'));
