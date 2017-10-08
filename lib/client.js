import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from '../containers/App';
import counterApp from '../reducers';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
//delete window._PRELOADED_STATE_;

// Create Redux store with initial state
const store = createStore(counterApp, preloadedState);

console.log('preloadedState', preloadedState);
console.log('store', store.getState());
console.log('prerendering', document.getElementById('root'));

render(
	<Provider store={store}>
    <App/>
	</Provider>,
	document.getElementById('root')
);

console.log('rendered', document.getElementById('root'));