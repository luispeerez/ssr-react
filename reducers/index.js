const defaultState = {
  counter:0, posts:[]
};

export default (state = defaultState, action) => {

  console.log('action', action);

  switch (action.type) {
    case 'INCREMENT':
      let newCounter = state.counter + 1;
      state = Object.assign({}, state,{
        counter: newCounter
      });
      return state;
    case 'DECREMENT':
      let newCounterDecrement = state.counter - 1;
      state = Object.assign({}, state,{
        counter: newCounterDecrement
      });
      return state;
    case 'FETCH_SUCCEEDED':
      state = Object.assign({}, state,{
        posts: action.data
      });
      return state;
    case 'FETCH_FAILED':
      console.log('action.error', action.error);
      state = Object.assign({}, state,{
        errorFetch: action.error.message
      });
      console.log('FETCH_FAILED state', state);
      return state;
    default:
      return state
  }
};