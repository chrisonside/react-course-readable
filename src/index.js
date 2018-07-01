import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';
// Import reducers, which will listen for actions dispatched by Redux store
import reducer from './reducers/masterReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Combine redux dev tools and middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create our store and pass in our combined reducer function, redux dev tools and middleware
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

/*
* Make store accessible to our root component using Provider from React Redux bindings
* Wrapping my App in React Router's BrowserRouter component
* BrowserRouter listens to changes in my App's URL and will notify other components when the URL does change
*/
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
