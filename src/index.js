import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk';
import logger from 'redux-logger'


const store = createStore(rootReducer, applyMiddleware(thunk, logger))


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

