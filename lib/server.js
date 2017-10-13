import path from 'path';
import Express from 'express';
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import counterApp from '../reducers';
import App from '../containers/App';
import {renderToString} from 'react-dom/server';
import qs from 'qs';
import {fetchCounter} from '../api/counter';
//import rootSaga from './sagas';
import rootSaga from './sagas-async';


const app = Express();
const port = 3000;

//Serving static files
app.use('/static', Express.static('static'));

// This is fired every time the server side receives a request
app.use(handleRender);

function handleRender(req, res){
  fetchCounter(apiResult => {
    const params = qs.parse(req.query);
    const counter = parseInt(params.counter, 10) || apiResult || 0;
    let preloadedState = {counter: counter};

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
      counterApp, 
      preloadedState,
      applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(rootSaga);

    console.log('store state', store.getState())
    const html = renderToString(
      <Provider store={store}>
        <App/>
      </Provider>
    );
    res.send(renderFullPage(html, preloadedState));
  })
}


/*
function handleRender(req, res){
  const params = qs.parse(req.query);
  const counter = parseInt(params.counter, 10) || 0;


  // Compile an initial state
  //let preloadedState = counter;  
  let preloadedState = {counter: counter};

  // Grab the initial state from our Redux store
  //const preloadedState = store.getState();

	//Create a new redux store instance
	const store = createStore(counterApp, preloadedState);
  //const store = createStore(counterApp);
  console.log('store state', store.getState())

	//Render the component to a string
	const html = renderToString(
		<Provider store={store}>
      <App/>
		</Provider>
	);

	// Grab the initial state from our Redux store
	//const preloadedState = store.getState();

  // Send the rendered page back to the client
  res.send(renderFullPage(html, preloadedState));
}
*/

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port);