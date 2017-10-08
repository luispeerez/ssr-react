/*export default (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
    	console.log('state before', state);
    	return state + 1;
    case 'DECREMENT':
    	return state -1;
    default:
      return state
  }
};*/

export default (state = {counter:0}, action) => {
  switch (action.type) {
    case 'INCREMENT':
      console.log('state counter', state.counter);
      let newCounter = state.counter + 1;
      console.log('newCounter', newCounter);
      state = Object.assign({}, state,{
        counter: newCounter
      });
      console.log('new state on INCREMENT', state);
      return state;
    case 'DECREMENT':
      console.log('state counter', state.counter);
      let newCounterDecrement = state.counter - 1;
      state = Object.assign({}, state,{
        counter: newCounterDecrement
      });
      console.log('new state on DECREMENT', state);
      return state;

    default:
      return state
  }
};